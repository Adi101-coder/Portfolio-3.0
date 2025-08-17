import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Download, X, File, FileText, Image, Video, Archive, RefreshCw, Clock, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import '../Stylesheets/ClassWorks.css';

const API_KEY = 'AIzaSyDhs1Z3zH342aYYPXrHA1rSTsLJ5kNaqJ0';

const folders = [
  { 
    name: 'DAA', 
    color: '#3b82f6', 
    folderId: '1HJQlhM6YTyzkSQEgoMeqsuD1cQMc11zS',
    description: 'Design & Analysis of Algorithms'
  },
  { 
    name: 'OS', 
    color: '#22c55e', 
    folderId: '1el5I9UgARk5jssPcWsswTd8VCO0eXrcV',
    description: 'Operating Systems'
  },
  { 
    name: 'DL', 
    color: '#f59e0b', 
    folderId: '1s_kY5lg97ISMK-ygx6PxDATvN1QJqJQA',
    description: 'Deep Learning'
  },
  { 
    name: 'CV', 
    color: '#8b5cf6', 
    folderId: 'coming-soon',
    description: 'Computer Vision'
  },
  { 
    name: 'Graph Visualization', 
    color: '#ec4899', 
    folderId: 'coming-soon',
    description: 'Graph Visualization & Analytics'
  },
];

const ClassWorks = () => {
  const { theme } = useTheme();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(null);

  const fetchFiles = useCallback(async (folderId, showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    setError(null);
    
    try {
      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,webViewLink,webContentLink,size,modifiedTime)`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Google API Error: ${data.error.message}`);
      }
      
      const sortedFiles = (data.files || []).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
      setFiles(sortedFiles);
      setLastUpdated(new Date());
    } catch (err) {
      setError(`Failed to load files: ${err.message}`);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
      setIsRefreshing(false);
    }
  }, []);

  const handleFolderClick = useCallback((folder) => {
    setSelectedFolder(folder);
    if (folder.folderId === 'coming-soon') {
      // For coming soon folders, set a placeholder file
      setFiles([{
        id: 'coming-soon',
        name: 'Coming Soon',
        mimeType: 'text/plain',
        size: '0',
        modifiedTime: new Date().toISOString(),
        isComingSoon: true
      }]);
      setLoading(false);
      setError(null);
    } else {
      fetchFiles(folder.folderId);
    }
  }, [fetchFiles]);

  const closeModal = useCallback(() => {
    setSelectedFolder(null);
    setFiles([]);
    setError(null);
  }, []);

  const handleRefresh = useCallback(() => {
    if (selectedFolder) {
      setIsRefreshing(true);
      fetchFiles(selectedFolder.folderId, false);
    }
  }, [selectedFolder, fetchFiles]);

  const toggleAutoRefresh = useCallback(() => {
    setAutoRefresh(!autoRefresh);
  }, [autoRefresh]);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && selectedFolder) {
        closeModal();
      }
    };

    if (selectedFolder) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedFolder, closeModal]);

  // Memoize expensive operations
  const getFileIcon = useCallback((mimeType) => {
    if (mimeType.includes('pdf')) return <FileText size={20} />;
    if (mimeType.includes('image')) return <Image size={20} />;
    if (mimeType.includes('video')) return <Video size={20} />;
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive size={20} />;
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return <FileText size={20} />;
    return <File size={20} />;
  }, []);

  const formatFileSize = useCallback((bytes) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString();
  }, []);

  const formatTime = useCallback((date) => {
    if (!date) return '';
    return date.toLocaleTimeString();
  }, []);

  // Set up auto-refresh polling
  useEffect(() => {
    if (autoRefresh && selectedFolder && selectedFolder.folderId !== 'coming-soon') {
      const interval = setInterval(() => {
        fetchFiles(selectedFolder.folderId, false);
      }, 30000); // Refresh every 30 seconds

      setRefreshInterval(interval);

      return () => {
        clearInterval(interval);
      };
    } else if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }
  }, [autoRefresh, selectedFolder, fetchFiles]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [refreshInterval]);

  return (
    <div className="classworks-container">
      <div className="classworks-title">Class Works</div>
      <div className="classworks-subtitle">
        Access course materials, assignments, and resources for all your subjects
      </div>
      <div className="classworks-grid">
        {folders.map((folder, idx) => (
          <motion.div
            key={folder.name}
            className="classworks-card"
            style={{ 
              '--card-color': folder.color,
              borderColor: folder.color 
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleFolderClick(folder)}
          >
            <Folder size={56} color={folder.color} />
            <div className="classworks-folder-name">{folder.name}</div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedFolder && (
          <motion.div
            className="classworks-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="classworks-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="classworks-modal-header">
                <div>
                  <h2 className="classworks-modal-title">
                    {selectedFolder.name} - Course Materials
                  </h2>
                  {lastUpdated && (
                    <div className="classworks-last-updated">
                      <Clock size={12} />
                      Last updated: {formatTime(lastUpdated)}
                    </div>
                  )}
                </div>
                <div className="classworks-header-actions">
                  <button 
                    className={`classworks-auto-refresh-btn ${autoRefresh ? 'active' : ''}`}
                    onClick={toggleAutoRefresh}
                    title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
                  >
                    <RefreshCw size={16} className={autoRefresh ? 'spinning' : ''} />
                  </button>
                  {!autoRefresh && (
                    <button 
                      className="classworks-refresh-btn"
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      title="Refresh files"
                    >
                      <RefreshCw size={16} className={isRefreshing ? 'spinning' : ''} />
                    </button>
                  )}
                  <button className="classworks-close-button" onClick={closeModal}>
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="classworks-file-list">
                {loading && (
                  <div className="classworks-loading">Loading files...</div>
                )}
                
                {error && (
                  <div className="classworks-error">{error}</div>
                )}
                
                {!loading && !error && files.length === 0 && (
                  <div className="classworks-loading">No files found in this folder.</div>
                )}
                
                {!loading && !error && files.map((file) => (
                  <motion.div
                    key={file.id}
                    className="classworks-file-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="classworks-file-info">
                      {getFileIcon(file.mimeType)}
                      <div>
                        <div className="classworks-file-name">{file.name}</div>
                        <div className="classworks-file-meta">
                          {formatFileSize(file.size)} • Modified: {formatDate(file.modifiedTime)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="classworks-file-actions">
                      {file.isComingSoon ? (
                        <span className="classworks-coming-soon">Coming Soon</span>
                      ) : (
                        <>
                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="classworks-preview-button"
                            >
                              <Eye size={16} />
                              Preview
                            </a>
                          )}
                          {file.webContentLink && (
                            <a
                              href={file.webContentLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="classworks-download-button"
                            >
                              <Download size={16} />
                              Download
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClassWorks; 