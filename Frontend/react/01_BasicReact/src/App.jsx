import './App.css';
import Message from '../components/Message.jsx';
import ProductTab from '../components/ProductTab.jsx';
function App() {
  let voterDetails = {voterName: "Kevin August" , address: "New Delhi" };
  let electionYears = [2024, 2025]
  return (
    <>
      {/*use with message.jsx*/}
      {/*<Message userName="kevin" textColor="pink" age={24} details={voterDetails} voted={electionYears} />*/}
      {/*<Message textColor="red" age={14}/>*/}
      <ProductTab />
    </>
  );
}

export default App;
