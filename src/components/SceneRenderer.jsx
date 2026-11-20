import SceneFrame from './SceneFrame.jsx';
import TitleScene from '../layouts/TitleScene.jsx';
import Statement from '../layouts/Statement.jsx';
import Question from '../layouts/Question.jsx';
import Tiles from '../layouts/Tiles.jsx';
import Flow from '../layouts/Flow.jsx';
import Columns from '../layouts/Columns.jsx';
import Tabs from '../layouts/Tabs.jsx';
import BeforeAfter from '../layouts/BeforeAfter.jsx';
import Hub from '../layouts/Hub.jsx';
import Matrix from '../layouts/Matrix.jsx';
import AppTour from '../layouts/AppTour.jsx';
import PromptLab from '../layouts/PromptLab.jsx';
import Closing from '../layouts/Closing.jsx';
import Reference from '../layouts/Reference.jsx';
import Documentary from './Documentary.jsx';
import GameLauncher from './GameLauncher.jsx';

const LAYOUTS = {
  title: TitleScene,
  statement: Statement,
  question: Question,
  tiles: Tiles,
  flow: Flow,
  columns: Columns,
  tabs: Tabs,
  beforeafter: BeforeAfter,
  hub: Hub,
  matrix: Matrix,
  apptour: AppTour,
  promptlab: PromptLab,
  closing: Closing,
  reference: Reference,
  documentary: Documentary,
  game: GameLauncher,
};

export default function SceneRenderer({ scene, api }) {
  const Layout = LAYOUTS[scene.layout];
  return (
    <div className={`scene-root layout-${scene.layout}`}>
      <SceneFrame scene={scene} onJump={api.go} bare={scene.layout === 'documentary'}>
        {Layout ? (
          <Layout scene={scene} api={api} />
        ) : (
          <div className="scene-pad">
            <p>Unknown layout “{scene.layout}” in scene {scene.id}.</p>
          </div>
        )}
      </SceneFrame>
    </div>
  );
}
