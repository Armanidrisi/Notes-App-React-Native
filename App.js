import AppNavigator from "./navigation/AppNavigator";
import NoteState from "./context/NoteState";

export default function App() {
  return(
  <NoteState>
    <AppNavigator />
  </NoteState>)
}
