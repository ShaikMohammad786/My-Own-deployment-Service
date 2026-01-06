import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('');
  const [deployedUrl, setDeployedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Poll for deployment status
  useEffect(() => {
    if (!projectId) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/status?id=${projectId}`);
        const data = await response.json();
        
        if (data.status && data.status.status) {
          setStatus(data.status.status);
          
          if (data.status.status === 'deployed') {
            setDeployedUrl(`http://${projectId}.localhost:3001`);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Status check error:', error);
      }
    };

    // Check immediately
    checkStatus();

    // Then poll every 3 seconds until deployed
    const interval = setInterval(() => {
      if (status !== 'deployed') {
        checkStatus();
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [projectId, status]);

  const handleDeploy = async (e) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      alert('Please enter a repository URL');
      return;
    }

    setLoading(true);
    setProjectId('');
    setStatus('');
    setDeployedUrl('');

    try {
      const response = await fetch('http://localhost:3000/sendrepourl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repourl: repoUrl }),
      });

      const data = await response.json();
      setProjectId(data.id);
      setStatus('uploading');
    } catch (error) {
      console.error('Deployment error:', error);
      alert('Failed to deploy. Make sure the backend is running on port 3000.');
      setLoading(false);
    }
  };

  const handleNewDeployment = () => {
    setRepoUrl('');
    setProjectId('');
    setStatus('');
    setDeployedUrl('');
    setLoading(false);
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return '📤 Uploading files to S3...';
      case 'uploaded':
        return '🔨 Building your project...';
      case 'deployed':
        return '✅ Deployment successful!';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <div className="logo-icon">▲</div>
            <span>Deploy</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Hero Section */}
          <div className="hero">
            <h1 className="hero-title">Deploy Your Project Instantly</h1>
            <p className="hero-subtitle">
              Deploy your GitHub repositories with zero configuration. 
              Just paste your repo URL and let us handle the rest.
            </p>
          </div>

          {/* Main Deployment Card */}
          <div className="card animate-fadeIn" style={{ maxWidth: '600px', margin: '0 auto' }}>
            {!deployedUrl ? (
              <>
                <h2 className="card-title">🚀 Deploy Your Repository</h2>
                
                <form onSubmit={handleDeploy}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="repoUrl">
                      GitHub Repository URL
                    </label>
                    <input
                      id="repoUrl"
                      type="text"
                      className="form-input"
                      placeholder="https://github.com/username/repository"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Deploying...
                      </>
                    ) : (
                      <>
                        <span>▲</span>
                        Deploy Now
                      </>
                    )}
                  </button>
                </form>

                {/* Status During Deployment */}
                {loading && status && (
                  <div className="result-section">
                    <div className="info-box">
                      <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="spinner"></span>
                        <strong>{getStatusMessage()}</strong>
                      </p>
                      {projectId && (
                        <p style={{ marginTop: '8px', fontSize: '0.8rem' }}>
                          Project ID: <code style={{ background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px' }}>{projectId}</code>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="card-title">🎉 Deployment Complete!</h2>
                
                <div className="result-section">
                  <div className="result-item">
                    <span className="result-label">Project ID</span>
                    <span className="result-value">{projectId}</span>
                  </div>
                  
                  <div className="result-item">
                    <span className="result-label">Status</span>
                    <span className="status-badge deployed">
                      <span className="status-indicator"></span>
                      deployed
                    </span>
                  </div>

                  <div className="info-box" style={{ marginTop: '1rem' }}>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>Your project is live! 🚀</strong>
                    </p>
                    <div className="code-block" style={{ userSelect: 'all', cursor: 'pointer' }}>
                      {deployedUrl}
                    </div>
                    <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                      Click to copy the URL above
                    </p>
                  </div>

                  <button 
                    onClick={handleNewDeployment}
                    className="btn btn-secondary btn-full"
                    style={{ marginTop: '1rem' }}
                  >
                    Deploy Another Project
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <p>Built with React + Vite • Powered by AWS S3, Redis & MongoDB</p>
        </div>
      </footer>
    </>
  );
}

export default App;

