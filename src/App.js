import React, {useEffect, useLayoutEffect, useState, useMemo, useRef } from "react";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import { getInitialData, showFormattedDate } from "./utils/data";
import usePrevious from "./usePrevious";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import NotesPages from "./pages/NotesPages";
import Form from "./pages/FormPages";
import DetailPages from "./pages/DetailPages";
import NotFoundPages from "./pages/NotFoundPages";
import LoginPages from "./pages/LoginPages";
import RegisterPage from "./pages/RegisterPages";
import ToggleTheme from "./components/ToggleTheme";
import { ThemeProvider } from "./ThemeContext";
import {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from './utils/api';
import image from './image/note.png';

const btnRemove = <i className="fa fa-trash"></i>;
const btnUndo = <i className="fa fa-undo"></i>;
const btnArchive = <i className="fa fa-file"></i>;

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams('search');
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [search, setSearch] = useState(keyword || "");
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'Light');
  const [update, setUpdate] = useState(0);
  const headerTheme = useRef(null);
  const mainTheme = useRef(null);
  const prevTheme = usePrevious(theme);
  const [isHeaderRendered, setIsHeaderRendered] = useState(false);

  console.log('ini prevTheme', prevTheme)

  useEffect(() => {
    async function getArchiveNote() {
      const { data } = await getArchivedNotes();
      const filteredNotes = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

      setArchivedNotes(filteredNotes);
    }  

    getArchiveNote();
  }, [update, search]);

  useEffect(() => {
    async function getActiveNote() {
      const { data } = await getActiveNotes();
      const filteredNotes = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))

      setActiveNotes(filteredNotes);
    };
 
    getActiveNote();
  }, [update, search]);

  useEffect(() => {
    if(headerTheme.current) {
      setIsHeaderRendered(true)
      console.log('ini setheader')
    }
  }, [prevTheme, theme]);

  console.log('ini headerrendered', isHeaderRendered)
  
  useEffect(() => {
    function changeBackgroundColor() {
      if(isHeaderRendered && headerTheme.current) {
          headerTheme.current.setAttribute('data-theme', theme);
          mainTheme.current.setAttribute('data-theme', theme);
          console.log('ini headerTheme', headerTheme);
      }

    }
  
    changeBackgroundColor();
  }, [theme, isHeaderRendered]);

  function toggleTheme() {
    setTheme(prevState => {
      const newTheme = prevState === 'Light' ? 'Dark' : 'Light';
      console.log('ini toggletheme', newTheme, typeof newTheme)

      localStorage.setItem('theme', newTheme);

      return newTheme
    })
  }

  function changeSearchParams(keyword) {
    setSearchParams({keyword});
  }

  async function addNewBook(title, body) {
    await addNote({title, body})

    setUpdate(prev => prev +  1)
    navigate('/');
  }

  async function onArchiveHandler(id) {
    await archiveNote(id)
    setUpdate(prev => prev +  1)
    navigate('/archived');
  }

  async function onActiveHandler(id) {
    await unarchiveNote(id)

    setUpdate(prev => prev +  1)

  }

  

  function popupDelete(id) {
    const confirmBox = window.confirm("Do you really want to delete this Item");

    if (confirmBox) {
      return deleteTask(id);
    } else {
      return;
    }
  }

  async function deleteTask(id) {
    await deleteNote(id); 
    console.log('ini delete handler', id)
    setUpdate(prev => prev + 1)
    navigate('/');
  }

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function logAuthHandler() {
    setAuthedUser(5); 
    putAccessToken('')
    navigate('/')
  }

  useEffect(() => {
    async function getAuthedUser() {
      const { error, data  } = await getUserLogged();
      if(error) {
        setInitializing(false)
      } else {
        setAuthedUser(data)
        setInitializing(false)
      }
      
    };
 
    getAuthedUser();
  }, []);

  console.log('ini theme usestate', theme, typeof theme)

 /*  baris ini adalah bug */

/*   const contextValue = useMemo(() => {
    return {
      theme,
      toggleTheme
    };
  }, [theme]); */

  const contextValue = {
    theme,
    toggleTheme
  }


  if (initializing) {
    return null;
  };

  if(authedUser == null) {
    return (
      <React.Fragment>
          <header className='autentication-header-page'>
            <h1>Notes App</h1>
          </header>
          <main className="autentication-main-page">
            <Routes>
              <Route path="/*" element={<LoginPages noteImage={image} loginSuccess={onLoginSuccess}/>}
              />
              <Route path="/register" element={<RegisterPage/>} />
            </Routes>
          </main>
        </React.Fragment>
      );
    }

  return (
    <React.Fragment>
      <ThemeProvider value={contextValue}>
        <header ref={headerTheme}  className="header-container">
          <NavBar />
          <SearchBar
            search={search} 
            setSearch={setSearch}
            setSearchParams={changeSearchParams}
          /> 
          <button className="btn-logout" onClick={logAuthHandler}>Logout</button>
          <ToggleTheme />
        </header>
        <main
          ref={mainTheme}
          className="main-container">
          <Routes>
            <Route 
              path={'/'}
              element={activeNotes ?
                <NotesPages
                  titleArticle='Active'
                  stylingID='completed'
                  filteredNotes={activeNotes}
                  status={false}
                  showFormattedDate={showFormattedDate}
                  popupDelete={popupDelete}
                  onArchiveHandler={onArchiveHandler}
                  btnRemove={btnRemove}
                  name={btnArchive}
                /> : <p>loading..</p>
              }
            /> 
            <Route 
              path={'/add'} 
              element={
                <Form addTitle={addNewBook} />
              }
            />  
            <Route 
              path={'/archived'}
              element={archivedNotes ?
                <NotesPages
                  titleArticle='Archive'
                  stylingID='uncompleted'
                  filteredNotes={archivedNotes}
                  status={true}
                  showFormattedDate={showFormattedDate}
                  popupDelete={popupDelete}
                  onArchiveHandler={onActiveHandler}
                  btnRemove={btnRemove}
                  name={btnUndo}
                  // showDetail={true}
                /> : <p>loading..</p>
              }
            />
            <Route 
              path={'/detail/:id'}
              element={
                <DetailPages
                  showFormattedDate={showFormattedDate}
                  popupDelete={popupDelete}
                  onArchiveHandler={onArchiveHandler}
                  onActiveHandler={onActiveHandler}
                />
              }
            />
            <Route
              path={'*'}
              element={
                <NotFoundPages />
              }
            />
          </Routes>  
        </main>
      </ThemeProvider>        
    </React.Fragment>
  ); 
}
