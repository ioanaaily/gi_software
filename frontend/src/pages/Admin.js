import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig"; 
import axios from "axios"; // Keep for login only
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function Admin() {
  const navigate = useNavigate();
  
  // State for login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  
  // State for news management
  const [activeTab, setActiveTab] = useState("list");
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  
  // State for contact messages
  const [contactMessages, setContactMessages] = useState([]);
  
  // State for news form
  const [newsForm, setNewsForm] = useState({
    id: null,
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "",
    published_date: new Date().toISOString().split('T')[0]
  });
  
  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
      fetchNews();
      
      // Fetch contact messages if the active tab is messages
      if (activeTab === "messages") {
        fetchContactMessages();
      }
    }
  }, [currentPage, activeTab]); // Re-fetch when page changes or tab changes
  
  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    
    console.log("Login attempt with:", loginForm.email);
    
    try {
      // Import config dynamically to avoid circular dependencies
      const config = await import('../config/config').then(module => module.default);
      
      // Attempt authentication with server
      console.log("Attempting authentication with server");
      const response = await axios({
        method: 'post',
        url: `${config.api.baseURL}/api/auth/login`,
        data: {
          email: loginForm.email,
          password: loginForm.password
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log("Login response:", response.data);
      
      if (response.data.access_token) {
        localStorage.setItem("adminToken", response.data.access_token);
        setIsLoggedIn(true);
        fetchNews();
      }
    } catch (err) {
      console.error("Login error:", err);
      
      if (err.response) {
        console.error("Error response:", err.response.data);
        setLoginError(`Login failed: ${err.response.data.detail || 'Invalid credentials'}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setLoginError("Server not responding. Make sure the backend server is running.");
      } else {
        console.error("Login setup error:", err.message);
        setLoginError(`Login failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };
  
  // Function to fetch news items
  const fetchNews = async () => {
    if (activeTab !== "list" && activeTab !== "add" && activeTab !== "edit") {
      return; // Don't fetch news if not on news tab
    }
  
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching news articles from server, page ${currentPage}`);
      const token = localStorage.getItem("adminToken");
      
      // Get the articles from the API with pagination
      // Token is automatically added by the api interceptor
      const response = await api.get(`/api/news/?page=${currentPage}&size=6`);
      
      console.log("News data received:", response.data);
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        // Old API format (non-paginated)
        setNewsItems(response.data);
        setTotalPages(1);
        setTotalArticles(response.data.length);
      } else if (response.data && response.data.items && Array.isArray(response.data.items)) {
        // New paginated format
        setNewsItems(response.data.items);
        setTotalPages(response.data.pages || 1);
        setTotalArticles(response.data.total || 0);
        console.log(`Got ${response.data.items.length} articles out of ${response.data.total} total`);
      } else {
        console.warn("Unexpected API response format:", response.data);
        setNewsItems([]);
        setTotalPages(1);
        setTotalArticles(0);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching news:", err);
      if (err.response) {
        setError(`Failed to load articles: ${err.response.data.detail || 'Server error'}`);
      } else {
        setError("Failed to load articles. Make sure the backend server is running.");
      }
      setNewsItems([]);
      setTotalPages(1);
      setTotalArticles(0);
      setLoading(false);
    }
  };
  
  // Function to fetch contact messages
  const fetchContactMessages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching contact messages from server");
      
      // Get the messages from the API
      const response = await api.get('/api/contact/messages');
      
      console.log("Contact messages received:", response.data);
      setContactMessages(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching contact messages:", err);
      if (err.response) {
        setError(`Failed to load messages: ${err.response.data.detail || 'Server error'}`);
      } else {
        setError("Failed to load messages. Make sure the backend server is running.");
      }
      setContactMessages([]);
      setLoading(false);
    }
  };
  
  // Function to handle form submission
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("adminToken");
    const headers = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Debug: Log what we're sending
    console.log("Submitting news with token:", token);
    console.log("News form data:", newsForm);
    
    try {
      let response;
      if (newsForm.id) {
        // Update existing news
        console.log(`Updating article ${newsForm.id}`);
        response = await api.put(
          `/api/news/${newsForm.id}`, 
          newsForm // No need to stringify, axios will do it
        );
      } else {
        // Create new news
        console.log("Creating new article");
        response = await api.post(
          "/api/news/", 
          newsForm // No need to stringify, axios will do it
        );
      }
      
      console.log("API response:", response.data);
      
      // Reset form and go back to list
      setNewsForm({
        id: null,
        title: "",
        excerpt: "",
        content: "",
        image_url: "",
        category: "",
        published_date: new Date().toISOString().split('T')[0]
      });
      setError(null); // Clear any previous errors
      setActiveTab("list");
      fetchNews();
    } catch (err) {
      console.error("Error saving news:", err);
      // Log more detailed error information
      if (err.response) {
        console.error("Response error data:", err.response.data);
        console.error("Response error status:", err.response.status);
        setError(`Failed to save news item: ${err.response.data.detail || 'Unknown error'}`);
      } else if (err.request) {
        console.error("Request error:", err.request);
        setError("Failed to save news item: No response received from server");
      } else {
        console.error("Error message:", err.message);
        setError(`Failed to save news item: ${err.message}`);
      }
    }
  };
  
  // Function to handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news item?")) {
      return;
    }
    
    const token = localStorage.getItem("adminToken");
    const headers = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    console.log(`Attempting to delete article ${id}`);
    
    try {
      const response = await api.delete(`/api/news/${id}`);
      console.log("Delete response:", response);
      setError(null);
      fetchNews();
    } catch (err) {
      console.error("Error deleting news:", err);
      
      // Log more detailed error information
      if (err.response) {
        console.error("Response error data:", err.response.data);
        console.error("Response error status:", err.response.status);
        setError(`Failed to delete news item: ${err.response.data.detail || 'Unknown error'}`);
      } else {
        setError("Failed to delete news item. Check server connection.");
      }
    }
  };
  
  // Function to edit news
  const handleEdit = (id) => {
    const newsItem = newsItems.find(item => item.id === id);
    if (newsItem) {
      setNewsForm({
        id: newsItem.id,
        title: newsItem.title,
        excerpt: newsItem.excerpt,
        content: newsItem.content,
        image_url: newsItem.image_url,
        category: newsItem.category,
        published_date: new Date(newsItem.published_date).toISOString().split('T')[0]
      });
      setActiveTab("edit");
    }
  };
  
  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsForm({ ...newsForm, [name]: value });
  };
  
  // Handle login form change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };
  
  // If not logged in, show login form
  if (!isLoggedIn) {
    return (
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-title-group">
            <h1 className="admin-title">Admin Login</h1>
            <p className="admin-subtitle">Please log in to access the admin panel</p>
          </div>
        </div>
        
        <div className="login-content">
          <form className="admin-form" onSubmit={(e) => { e.preventDefault(); handleLogin(e); }}>
            {loginError && (
              <div className="login-error">
                {loginError}
              </div>
            )}
            
            <div className="admin-form-group">
              <label className="admin-form-label">Email</label>
              <input 
                type="email" 
                name="email" 
                value={loginForm.email} 
                onChange={handleLoginChange} 
                className="admin-form-input" 
                placeholder="admin@gisoftware.com"
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Password</label>
              <input 
                type="password" 
                name="password" 
                value={loginForm.password} 
                onChange={handleLoginChange} 
                className="admin-form-input" 
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="admin-form-buttons" style={{ justifyContent: 'center' }}>
              <button 
                type="submit" 
                className="admin-form-button"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            
            <div className="demo-login-info">
              Demo credentials: admin@gisoftware.com / admin
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  // Admin panel when logged in
  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title-group">
          <h1 className="admin-title">Admin Panel</h1>
          <p className="admin-subtitle">Manage your website content</p>
        </div>
        <button onClick={handleLogout} className="admin-logout-button">Logout</button>
      </div>
      
      <div className="admin-dashboard">
        <div className="admin-sidebar">
          <ul className="admin-nav">
            <li className="admin-nav-item">
              <button 
                className={`admin-nav-link ${activeTab === 'list' ? 'active' : ''}`}
                onClick={() => setActiveTab('list')}
              >
                AI News Articles
              </button>
            </li>
            <li className="admin-nav-item">
              <button 
                className={`admin-nav-link ${activeTab === 'add' ? 'active' : ''}`}
                onClick={() => {
                  setNewsForm({
                    id: null,
                    title: "",
                    excerpt: "",
                    content: "",
                    image_url: "",
                    category: "",
                    published_date: new Date().toISOString().split('T')[0]
                  });
                  setActiveTab('add');
                }}
              >
                Add New Article
              </button>
            </li>
            <li className="admin-nav-item">
              <button 
                className={`admin-nav-link ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('messages');
                  fetchContactMessages();
                }}
              >
                My Messages
              </button>
            </li>
          </ul>
        </div>
        
        <div className="admin-content">
          {error && <div className="admin-error">{error}</div>}
          
          {activeTab === 'list' && (
            <>
              <h2 className="admin-section-title">AI News Articles</h2>
              {loading ? (
                <div className="admin-loading">Loading...</div>
              ) : (
                <>
                  {totalArticles > 0 && (
                    <div className="admin-pagination-info">
                      Showing page {currentPage} of {totalPages} ({totalArticles} total articles)
                    </div>
                  )}
                
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Published Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(newsItems) && newsItems.length > 0 ? newsItems.map(news => (
                        <tr key={news.id}>
                          <td>{news.title}</td>
                          <td>{news.category}</td>
                          <td>{new Date(news.published_date).toLocaleDateString()}</td>
                          <td>
                            <div className="admin-actions">
                              <button 
                                onClick={() => handleEdit(news.id)} 
                                className="admin-action-button edit"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(news.id)} 
                                className="admin-action-button delete"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" style={{textAlign: 'center'}}>No news items available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  
                  {/* Pagination controls */}
                  {totalPages > 1 && (
                    <div className="admin-pagination">
                      <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="admin-pagination-button"
                      >
                        Previous
                      </button>
                      
                      <div className="admin-pagination-pages">
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`admin-pagination-page ${currentPage === index + 1 ? 'active' : ''}`}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="admin-pagination-button"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          
          {activeTab === 'messages' && (
            <>
              <h2 className="admin-section-title">My Messages</h2>
              {loading ? (
                <div className="admin-loading">Loading...</div>
              ) : (
                <>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(contactMessages) && contactMessages.length > 0 ? contactMessages.map(msg => (
                        <tr key={msg.id}>
                          <td>{msg.name}</td>
                          <td>
                            <a href={`mailto:${msg.email}`} className="email-link">
                              {msg.email}
                            </a>
                          </td>
                          <td className="message-cell">
                            <div className="message-content">
                              {msg.message}
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="3" style={{textAlign: 'center'}}>No messages available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}
          
          {(activeTab === 'add' || activeTab === 'edit') && (
            <>
              <h2 className="admin-section-title">
                {activeTab === 'add' ? 'Add New Article' : 'Edit Article'}
              </h2>
              <form onSubmit={handleNewsSubmit} className="admin-form">
                <div className="admin-form-group">
                  <label className="admin-form-label">Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={newsForm.title} 
                    onChange={handleInputChange} 
                    className="admin-form-input" 
                    required 
                  />
                </div>
                
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category</label>
                    <input 
                      type="text" 
                      name="category" 
                      value={newsForm.category} 
                      onChange={handleInputChange} 
                      className="admin-form-input" 
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">Published Date</label>
                    <input 
                      type="date" 
                      name="published_date" 
                      value={newsForm.published_date} 
                      onChange={handleInputChange} 
                      className="admin-form-input" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-form-label">Image URL</label>
                  <input 
                    type="url" 
                    name="image_url" 
                    value={newsForm.image_url} 
                    onChange={handleInputChange} 
                    className="admin-form-input" 
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-form-label">Excerpt (Short Summary)</label>
                  <textarea 
                    name="excerpt" 
                    value={newsForm.excerpt} 
                    onChange={handleInputChange} 
                    className="admin-form-textarea" 
                    rows="2"
                    required
                  ></textarea>
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-form-label">Content</label>
                  <textarea 
                    name="content" 
                    value={newsForm.content} 
                    onChange={handleInputChange} 
                    className="admin-form-textarea" 
                    rows="10"
                    required
                  ></textarea>
                </div>
                
                <div className="admin-form-buttons">
                  <button type="button" onClick={() => setActiveTab('list')} className="admin-form-button cancel">
                    Cancel
                  </button>
                  <button type="submit" className="admin-form-button">
                    {activeTab === 'add' ? 'Add Article' : 'Update Article'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;