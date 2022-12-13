import logo from './logo.svg';
import './App.css';
import { ContextProvider } from './context';
import Header from './components/layout/Header';
import Main from './components/layout/Main';

function App() {
  return (
<ContextProvider>
  <Header></Header>
  <Main></Main>
</ContextProvider>
  );
}


export default App;
