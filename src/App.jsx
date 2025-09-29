import { useMemo, useState } from 'react';
import TabNavigation from './components/TabNavigation.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import TagCategory from './components/TagCategory.jsx';
import { tagCategories } from './data/tagCategories.js';
import { videos } from './data/videos.js';
import './styles/app.css';

const TABS = [
  { id: 'review', label: 'Review & Tag' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'library', label: 'Video Library' }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('review');
  const [selectedVideoId, setSelectedVideoId] = useState(videos[0]?.id ?? '');
  const [categorySelections, setCategorySelections] = useState(() => {
    return Object.fromEntries(tagCategories.map((category) => [category.id, []]));
  });
  const [notes, setNotes] = useState('');

  const selectedVideo = useMemo(
    () => videos.find((video) => video.id === selectedVideoId),
    [selectedVideoId]
  );

  const captureTimeCategory = useMemo(() => {
    if (!selectedVideo?.captureTimeTag) {
      return null;
    }

    return {
      id: 'capture-time',
      name: 'Capture Time',
      readOnly: true,
      tags: [selectedVideo.captureTimeTag]
    };
  }, [selectedVideo]);

  const categoriesForDisplay = useMemo(() => {
    return captureTimeCategory ? [...tagCategories, captureTimeCategory] : tagCategories;
  }, [captureTimeCategory]);

  const handleTagToggle = (categoryId, tagId) => {
    setCategorySelections((prev) => {
      const currentTags = prev[categoryId] ?? [];
      const nextTags = currentTags.includes(tagId)
        ? currentTags.filter((existingTag) => existingTag !== tagId)
        : [...currentTags, tagId];

      return {
        ...prev,
        [categoryId]: nextTags
      };
    });
  };

  const handleStepVideo = (direction) => {
    if (!videos.length) return;

    const currentIndex = videos.findIndex((video) => video.id === selectedVideoId);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (safeIndex + direction + videos.length) % videos.length;
    setSelectedVideoId(videos[nextIndex].id);
  };

  const renderReviewTab = () => {
    return (
      <div className="grid-layout">
        <div className="grid-layout__primary">
          <div className="video-selector">
            <label htmlFor="videoSelect">Select video</label>
            <select
              id="videoSelect"
              value={selectedVideoId}
              onChange={(event) => setSelectedVideoId(event.target.value)}
            >
              <option value="" disabled>
                Choose a video
              </option>
              {videos.map((video) => (
                <option key={video.id} value={video.id}>
                  {video.title}
                </option>
              ))}
            </select>
            <div className="video-selector__actions">
              <button type="button" onClick={() => handleStepVideo(-1)}>
                ◀ Previous
              </button>
              <button type="button" onClick={() => handleStepVideo(1)}>
                Next ▶
              </button>
            </div>
            {selectedVideo?.description ? (
              <p className="video-selector__description">{selectedVideo.description}</p>
            ) : null}
          </div>
          <VideoPlayer
            src={selectedVideo?.src}
            poster={selectedVideo?.poster}
            title={selectedVideo?.title}
          />
          <div className="notes-panel">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              placeholder="Add any context or additional information here."
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>
        </div>
        <div className="grid-layout__sidebar">
          <div className="tags-panel">
            <h2>Tag categories</h2>
            <p className="tags-panel__hint">
              Toggle tags to describe the video. Categories are configured in <code>src/data/tagCategories.js</code>.
            </p>
            <div className="tags-panel__list">
              {categoriesForDisplay.map((category) => (
                <TagCategory
                  key={category.id}
                  category={category}
                  selectedTags={
                    category.readOnly
                      ? category.tags.map((tag) => tag.id)
                      : categorySelections[category.id] ?? []
                  }
                  onToggleTag={handleTagToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalysisTab = () => (
    <div className="placeholder">
      <h2>Analysis workspace</h2>
      <p>
        This area will surface insights from the collected tags such as usage frequency, correlations, and reviewer
        activity. Wire analytics components into this tab when the data layer is ready.
      </p>
    </div>
  );

  const renderLibraryTab = () => (
    <div className="placeholder">
      <h2>Video library and filters</h2>
      <p>
        Use this area to search, filter, and queue videos based on their tags. Implement filtering controls and result
        lists once tagging data is persisted.
      </p>
    </div>
  );

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1>Video Review Dashboard</h1>
        <p>Tag and manage your content library with an extensible review workflow.</p>
      </header>
      <main className="app-shell__main">
        <TabNavigation tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        <section className="app-shell__content" aria-live="polite">
          {activeTab === 'review' && renderReviewTab()}
          {activeTab === 'analysis' && renderAnalysisTab()}
          {activeTab === 'library' && renderLibraryTab()}
        </section>
      </main>
    </div>
  );
};

export default App;

