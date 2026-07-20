import { useGame, getSessionSummary } from './useGame';
import { getPalette } from './palettes';
import { HomeScreen } from './components/HomeScreen';
import { GameScreen } from './components/GameScreen';
import { SummaryScreen } from './components/SummaryScreen';

function App() {
  const {
    state,
    palette: paletteName,
    setPalette,
    startGame,
    answerObject,
    answerSign,
    answerSector,
    pauseGame,
    resumeGame,
    endSession,
    playAgain,
    exitToHome,
  } = useGame();

  const palette = getPalette(paletteName);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: palette.bg,
        color: palette.text,
        fontFamily: "'Atkinson Hyperlegible', Helvetica, Arial, sans-serif",
      }}
    >
      {state.phase === 'inicio' && (
        <HomeScreen
          palette={palette}
          paletteName={paletteName}
          onChangePalette={setPalette}
          bestLevelEver={state.bestLevelEver}
          unlockedMilestones={state.unlockedMilestones}
          onStart={startGame}
        />
      )}

      {state.phase === 'resumen' && (
        <SummaryScreen
          summary={getSessionSummary(state)}
          palette={palette}
          onPlayAgain={playAgain}
          onExit={exitToHome}
        />
      )}

      {state.phase !== 'inicio' && state.phase !== 'resumen' && (
        <GameScreen
          state={state}
          palette={palette}
          onAnswerObject={answerObject}
          onAnswerSign={answerSign}
          onAnswerSector={answerSector}
          onPause={pauseGame}
          onResume={resumeGame}
          onEndSession={endSession}
          onExitToHome={exitToHome}
        />
      )}
    </div>
  );
}

export default App;
