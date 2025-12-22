'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Footer from '@/app/components/footer'
import OptimizedImage from '@/app/components/OptimizedImage'
import Link from 'next/link'
import Header_new from '@/app/components/header_new'
import axios from 'axios'
import { SimpleSpinner } from '@/app/components/loading'
import { SkeletonImage } from '@/app/components/skeletons'

export default function Greenindiagallery({ params }) {
  const [intitiativeName, setInitiativeName] = useState("")
  const [albums, setAlbums] = useState([])
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [newsRoom, setNewsRoom] = useState([])
  const [pressclipping, setPressclipping] = useState([])
  const [loading, setLoading] = useState(true)
  const [initiativeId, setInitiativeId] = useState(null)
  // auto slider index map for news links per item
  const [newsLinkIndex, setNewsLinkIndex] = useState({})
  // expand/collapse map for per-card links
  const [expandedLinksMap, setExpandedLinksMap] = useState({})
  // refs for custom scroll containers per news item
  const newsLinksRefs = useRef({})

  // pagination
  const [albumsPage, setAlbumPage] = useState(1)
  const [imagesPage, setImagesPage] = useState(1)
  const [videosPage, setVideosPage] = useState(1)
  const [newsRoomPage, setNewsRoomPage] = useState(1)
  const [pressclippingPage, setPressclippingPage] = useState(1)
  // tabs scrolling ref
  const tabsRef = useRef(null)

  // active tab - persist across reloads using URL hash
  const [activeTab, setActiveTab] = useState("albums")
  
  // data loaded flags to prevent re-fetching
  const [dataLoaded, setDataLoaded] = useState({
    albums: false,
    images: false,
    videos: false,
    news: false,
    press: false
  })

  // popup
  const [popimg, setPopimg] = useState()
  const [showPop, setShowPop] = useState(false)

  // env
  useEffect(() => {
  console.log("API Route 2:", process.env.NEXT_PUBLIC_API_ROUTE2);
  console.log("Browser ID:", process.env.NEXT_PUBLIC_BROWSER_ID);
}, []);
  console.log("Browser ID:", process.env.NEXT_PUBLIC_BROWSER_ID)
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE2
  console.log("API Route:", apiRoute)
  const userId = process.env.NEXT_PUBLIC_USER_ID

  // Restore active tab from URL hash or localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1)
      const savedTab = hash || localStorage.getItem('gallery-active-tab')
      if (savedTab && ['albums', 'images', 'videos', 'news', 'press'].includes(savedTab)) {
        setActiveTab(savedTab)
      }
    }
  }, [])

  // Resolve human-readable slug to initiative ObjectId expected by API
  useEffect(() => {
    const slug = params.slug
    if (!slug) return

    // If slug already looks like an ObjectId, use it directly
    const isObjectId = /^[a-fA-F0-9]{24}$/.test(slug)
    if (isObjectId) {
      setInitiativeId(slug)
      return
    }

    const slugify = (str) =>
      (str || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

    ;(async () => {
      try {
        const res = await axios.post(
          `${apiRoute}/listinitiative`,
          { userId: 'IGM_USER' },
          { headers: { 'Content-Type': 'application/json' } }
        )
        console.log("jijjjjj",res);
        const list = res?.data?.Data || []
        const match = list.find((it) => slugify(it.title) === slug)

        if (match) {
          setInitiativeId(match.initiativeId)
          if (!intitiativeName) setInitiativeName(match.title)
        } else {
          console.warn('No initiative matched slug:', slug)
        }
      } catch (e) {
        console.error('Failed to resolve initiative slug:', e)
      }
    })()
  }, [params.slug, apiRoute, intitiativeName])

  // API functions with logging
  const getAlbums = useCallback(async () => {
    try {
      setLoading(true)
      if (!initiativeId) return
      console.log("📡 Fetching Albums with initiativeId:", initiativeId)
      const response = await axios.post(
        `${apiRoute}/listalbumcat`,
        { userId, initiativeId },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log("✅ Albums:", response.data)
      setAlbums(response.data.Data || [])
      setInitiativeName(response.data.InitiativeName || "")
      setDataLoaded(prev => ({ ...prev, albums: true }))
    } catch (error) {
      console.error("❌ Albums API Error:", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }, [initiativeId, apiRoute, userId])

  const getImages = useCallback(async () => {
    try {
      setLoading(true)
      if (!initiativeId) return
      console.log("📡 Fetching Images with initiativeId:", initiativeId)
      const response = await axios.post(
        `${apiRoute}/listwebimage`,
        { userId, initiativeId },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log("✅ Images:", response.data)
      setImages(response.data.Data || [])
      setDataLoaded(prev => ({ ...prev, images: true }))
    } catch (error) {
      console.error("❌ Images API Error:", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }, [initiativeId, apiRoute, userId])

  const getVideos = useCallback(async () => {
    try {
      setLoading(true)
      if (!initiativeId) return
      console.log("📡 Fetching Videos with initiativeId:", initiativeId)
      const response = await axios.post(
        `${apiRoute}/listwebvideo`,
        { userId, initiativeId },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log("✅ Videos:", response.data)
      setVideos(response.data.Data || [])
      setDataLoaded(prev => ({ ...prev, videos: true }))
    } catch (error) {
      console.error("❌ Videos API Error:", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }, [initiativeId, apiRoute, userId])

  const getNews = useCallback(async () => {
    try {
      setLoading(true)
      if (!initiativeId) return
      console.log("📡 Fetching News with initiativeId:", initiativeId)
      const response = await axios.post(
        `${apiRoute}/listwebnews`,
        { userId, initiativeId },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log("✅ News:", response.data)
      setNewsRoom(response.data.Data || [])
      console.log("NewsRoom Data:", response.data.Data || [])
      setDataLoaded(prev => ({ ...prev, news: true }))
    } catch (error) {
      console.error("❌ News API Error:", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }, [initiativeId, apiRoute, userId])

  const getPress = useCallback(async () => {
    try {
      setLoading(true)
      if (!initiativeId) return
      console.log("📡 Fetching Press with initiativeId:", initiativeId)
      const response = await axios.post(
        `${apiRoute}/listwebpress`,
        { userId, initiativeId },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log("✅ Press:", response.data)
      setPressclipping(response.data.Data || [])
      setDataLoaded(prev => ({ ...prev, press: true }))
    } catch (error) {
      console.error("❌ Press API Error:", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }, [initiativeId, apiRoute, userId])

  // shared pagination (slider) renderer for images/videos/news/press
  const renderPagination = (totalCount, currentPage, setPage, perPage = 15) => {
    const totalPages = Math.ceil((totalCount || 0) / perPage)
    if (!totalPages || totalPages <= 1) return null

    const pages = []
    const pushBtn = (label, key, onClick, isActive=false, isDisabled=false) => (
      <button
        key={key}
        onClick={onClick}
        disabled={isDisabled}
        style={{
          padding: '8px 12px',
          margin: '0 4px',
          border: 'none',
          backgroundColor: isActive ? '#28a745' : 'transparent',
          color: isActive ? '#fff' : (isDisabled ? '#999' : '#333'),
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: isActive ? '600' : '500',
          minWidth: '32px'
        }}
      >
        {label}
      </button>
    )

    const startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, currentPage + 2)

    // First page
    pages.push(pushBtn(1, 'p-1', () => setPage(1), currentPage === 1))
    if (startPage > 2) pages.push(<span key="el1" style={{margin:'0 8px', color:'#666'}}>...</span>)

    // Middle range
    for (let i = Math.max(2, startPage); i <= Math.min(totalPages - 1, endPage); i++) {
      pages.push(pushBtn(i, `p-${i}`, () => setPage(i), currentPage === i))
    }

    // Last page
    if (endPage < totalPages - 1) pages.push(<span key="el2" style={{margin:'0 8px', color:'#666'}}>...</span>)
    if (totalPages > 1) pages.push(pushBtn(totalPages, `p-${totalPages}`, () => setPage(totalPages), currentPage === totalPages))

    // NEXT
    pages.push(pushBtn('NEXT', 'next', () => setPage(Math.min(totalPages, currentPage + 1)), false, currentPage >= totalPages))

    return (
      <div
        className="pagination"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30px',
          padding: '15px 20px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: 'fit-content',
          margin: '30px auto 0'
        }}
      >
        {pages}
      </div>
    )
  }

  // load albums after initiativeId is resolved
  useEffect(() => {
    if (initiativeId && !dataLoaded.albums) {
      getAlbums()
    }
  }, [initiativeId, dataLoaded.albums, getAlbums])
  
  // Load data for the active tab when initiativeId is available
  useEffect(() => {
    if (!initiativeId) return
    
    if (activeTab === 'images' && !dataLoaded.images) {
      getImages()
    } else if (activeTab === 'videos' && !dataLoaded.videos) {
      getVideos()
    } else if (activeTab === 'news' && !dataLoaded.news) {
      getNews()
    } else if (activeTab === 'press' && !dataLoaded.press) {
      getPress()
    }
  }, [initiativeId, activeTab, dataLoaded.images, dataLoaded.videos, dataLoaded.news, dataLoaded.press, getImages, getVideos, getNews, getPress])

  // initialize news link indices when news list changes
  useEffect(() => {
    if (!newsRoom || newsRoom.length === 0) return
    const init = {}
    newsRoom.forEach((item, idx) => {
      const itemId = item.id || item._id || item.newsId || item.articleId || `news-${idx}`
      init[itemId] = 0
    })
    setNewsLinkIndex(init)
  }, [newsRoom])

  // Note: removed auto-advance and auto-scroll; slider is manual per user request

  // handle tab switch
  const handleTabClick = (tab) => {
    setActiveTab(tab)
    // Save to URL hash and localStorage
    if (typeof window !== 'undefined') {
      window.location.hash = tab
      localStorage.setItem('gallery-active-tab', tab)
    }
    
    // Data fetching is handled by the useEffect below - no need to call here
    // This prevents duplicate API calls
  }

  // keep tabs scrolled to visible area, and ensure first tab is visible by default
  useEffect(() => {
    const ul = tabsRef.current
    if (!ul) return
    if (!activeTab || activeTab === 'albums') ul.scrollLeft = 0
    try {
      const activeEl = ul.querySelector('li.active')
      if (activeEl && activeEl.scrollIntoView) {
        activeEl.scrollIntoView({ behavior: 'auto', inline: 'start', block: 'nearest' })
      }
    } catch (e) {
      // no-op
    }
  }, [activeTab])

  // on mount, force tabs to start from left to avoid clipping
  useEffect(() => {
    const ul = tabsRef.current
    if (ul) ul.scrollLeft = 0
  }, [])

  const getSRC = (src) => {
    setShowPop(true)
    setPopimg(src)
  }
  console.log("intitiativeName", intitiativeName );

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .news-box {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        @media (max-width: 768px) {
          .news-box {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div id="handler-first"></div>
      <div className="header-wrap"><Header_new /></div>
      <div className="desktop-div">
        <section className="project-detail-sec home-sec1 gallery-page">
          <div className="container">
            <div className="project-detail-cover">
              <div className="row">
                <div className="col-md-12">
                  <h1
                    style={{
                      textAlign: 'left',
                      fontSize: 'clamp(22px, 6vw, 48px)',
                      lineHeight: 1.1,
                      fontWeight: 600,
                      margin: '24px 0 24px 0',
                      color: '#0b0b0b',
                      letterSpacing: '0px',
                      textTransform: 'none',
                      whiteSpace: 'normal'
                    }}
                  >
                    {intitiativeName }

                     
                  </h1>
                </div>
              </div>

              {/* Tabs */}
              <div className="row">
                <div className="col-md-12">
                  <div className="gallery-tabs" style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
                    <ul
                      ref={tabsRef}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        padding: '8px',
                        margin: 0,
                        listStyle: 'none',
                        border: '1px solid #e5e7eb',
                        borderRadius: '20px',
                        background: '#ffffff',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: '700px'
                      }}
                    >
                      {[
                        { key: 'albums', label: 'Albums' },
                        { key: 'images', label: 'Images' },
                        { key: 'videos', label: 'Videos' },
                        { key: 'news', label: 'News Room' },
                        { key: 'press', label: 'Press Clippings' }
                      ].map((t, idx, arr) => (
                        <li
                          key={t.key}
                          className={activeTab === t.key ? 'active' : ''}
                          style={{
                            padding: 0,
                            borderRadius: '10px',
                            background: activeTab === t.key ? '#28a745' : 'transparent',
                            flex: '1 1 auto',
                            minWidth: 'fit-content',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleTabClick(t.key)}
                            style={{
                              padding: '10px 16px',
                              cursor: 'pointer',
                              userSelect: 'none',
                              border: 'none',
                              outline: 'none',
                              background: 'transparent',
                              color: activeTab === t.key ? '#ffffff' : '#111827',
                              fontSize: 'clamp(11px, 2.5vw, 14px)',
                              fontWeight: 600,
                              lineHeight: 1.2,
                              width: '100%',
                              whiteSpace: 'nowrap',
                              textAlign: 'center',
                              minHeight: '40px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {t.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="row">
                <div className="col-md-12">
                  <div className="gallery-list">
                  
                    {/* Albums */}
                    {activeTab === "albums" && (
                    <div style={{background:'#fff', padding:'20px', borderRadius:'12px'}}>
                    <ul className="album-box" style={{
                      display:'grid',
                      gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))',
                      gap:'20px',
                      padding:0,
                      margin:0,
                      listStyle:'none',
                      alignItems:'stretch'
                    }}>
                        {loading ? (
                          <>
                            {[...Array(6)].map((_, i) => (
                              <li key={i} style={{listStyle:'none', height:'100%'}}>
                                <div style={{
                                  borderRadius:'16px',
                                  overflow:'hidden',
                                  boxShadow:'0 2px 10px rgba(0,0,0,0.08)',
                                  background:'#fff',
                                  height:'100%'
                                }}>
                                  <div style={{
                                    height:'220px',
                                    background:'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                                    backgroundSize:'1000px 100%',
                                    animation:'shimmer 2s infinite linear'
                                  }}></div>
                                  <div style={{padding:'14px 16px', minHeight:'64px'}}>
                                    <div style={{
                                      height:'18px',
                                      borderRadius:'4px',
                                      background:'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                                      backgroundSize:'1000px 100%',
                                      animation:'shimmer 2s infinite linear',
                                      width:'80%'
                                    }}></div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </>
                        ) :
                            albums?.length > 0 ? (
                              albums.slice(albumsPage * 15 - 15, albumsPage * 15).map((item) => (
                            <li key={item.catId} style={{listStyle:'none', height:'100%'}}>
                              <Link href={`${params.slug}/${item.catId}`} style={{display:'block', height:'100%'}}>
                                <div className="gallery-box" style={{
                                  marginTop:0,
                                  borderRadius:'16px',
                                  overflow:'hidden',
                                  boxShadow:'0 2px 10px rgba(0,0,0,0.08)',
                                  background:'#fff',
                                  height:'100%',
                                  display:'flex',
                                  flexDirection:'column'
                                }}>
                                  <div className="gallery-img" style={{position:'relative', height:'220px', overflow:'hidden', background:'#f5f5f5'}}>
                                    <OptimizedImage src={item.image} fill alt={item.title} style={{objectFit:'cover'}} />
                                  </div>
                                  <div className="gallery-box-content" style={{padding:'14px 16px', minHeight:'64px', display:'flex', alignItems:'center'}}>
                                    <h4 style={{
                                      margin:0,
                                      fontSize:'18px',
                                      fontWeight:600,
                                      lineHeight:1.3,
                                      display:'-webkit-box',
                                      WebkitLineClamp:2,
                                      WebkitBoxOrient:'vertical',
                                      overflow:'hidden'
                                    }}>
                                      <span>{item.title}</span>
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))
                            ) : (
                              <li>No albums found</li>
                            )
                        }
                      </ul>
                        
                        {/* Pagination Controls */}
                        {albums?.length > 15 && (
                          <div className="pagination" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '30px',
                            padding: '15px 20px',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            maxWidth: 'fit-content',
                            margin: '30px auto 0'
                          }}>
                            {(() => {
                              const totalPages = Math.ceil(albums.length / 15);
                              const pages = [];
                              
                              // Previous button
                              if (albumsPage > 1) {
                                pages.push(
                                  <button
                                    key="prev"
                                    onClick={() => setAlbumPage(albumsPage - 1)}
                                    style={{
                                      padding: '8px 12px',
                                      margin: '0 4px',
                                      border: 'none',
                                      backgroundColor: 'transparent',
                                      color: '#333',
                                      cursor: 'pointer',
                                      borderRadius: '6px',
                                      fontSize: '14px',
                                      fontWeight: '500'
                                    }}
                                  >
                                    ←
                                  </button>
                                );
                              }
                              
                              // Page numbers
                              const startPage = Math.max(1, albumsPage - 2);
                              const endPage = Math.min(totalPages, albumsPage + 2);
                              
                              // First page
                              if (startPage > 1) {
                                pages.push(
                                  <button
                                    key={1}
                                    onClick={() => setAlbumPage(1)}
                                    style={{
                                      padding: '8px 12px',
                                      margin: '0 4px',
                                      border: 'none',
                                      backgroundColor: 'transparent',
                                      color: '#333',
                                      cursor: 'pointer',
                                      borderRadius: '6px',
                                      fontSize: '14px',
                                      fontWeight: '500'
                                    }}
                                  >
                                    1
                                  </button>
                                );
                                if (startPage > 2) {
                                  pages.push(<span key="ellipsis1" style={{margin: '0 8px', color: '#666'}}>...</span>);
                                }
                              }
                              
                              // Middle pages
                              for (let i = startPage; i <= endPage; i++) {
                                pages.push(
                                  <button
                                    key={i}
                                    onClick={() => setAlbumPage(i)}
                                    style={{
                                      padding: '8px 12px',
                                      margin: '0 4px',
                                      border: 'none',
                                      backgroundColor: i === albumsPage ? '#28a745' : 'transparent',
                                      color: i === albumsPage ? '#fff' : '#333',
                                      cursor: 'pointer',
                                      borderRadius: '6px',
                                      fontSize: '14px',
                                      fontWeight: '500',
                                      minWidth: '32px'
                                    }}
                                  >
                                    {i}
                                  </button>
                                );
                              }
                              
                              // Last page
                              if (endPage < totalPages) {
                                if (endPage < totalPages - 1) {
                                  pages.push(<span key="ellipsis2" style={{margin: '0 8px', color: '#666'}}>...</span>);
                                }
                                pages.push(
                                  <button
                                    key={totalPages}
                                    onClick={() => setAlbumPage(totalPages)}
                                    style={{
                                      padding: '8px 12px',
                                      margin: '0 4px',
                                      border: 'none',
                                      backgroundColor: 'transparent',
                                      color: '#333',
                                      cursor: 'pointer',
                                      borderRadius: '6px',
                                      fontSize: '14px',
                                      fontWeight: '500'
                                    }}
                                  >
                                    {totalPages}
                                  </button>
                                );
                              }
                              
                              // Next button
                              if (albumsPage < totalPages) {
                                pages.push(
                                  <button
                                    key="next"
                                    onClick={() => setAlbumPage(albumsPage + 1)}
                                    style={{
                                      padding: '8px 12px',
                                      margin: '0 4px',
                                      border: 'none',
                                      backgroundColor: 'transparent',
                                      color: '#333',
                                      cursor: 'pointer',
                                      borderRadius: '6px',
                                      fontSize: '14px',
                                      fontWeight: '500'
                                    }}
                                  >
                                    NEXT
                                  </button>
                                );
                              }
                              
                              return pages;
                            })()}
                          </div>
                        )}
                      </div>
                    )}
{/* Images */}
                    {/* Images */}
                    {activeTab === "images" && (
  <div style={{background:'#fff', padding:'20px', borderRadius:'12px'}}>
    {/* Debug info removed */}

    {/* Force visible container with explicit styles */}
    <div 
      className="image-box-container"
      style={{
        display: 'block',
        visibility: 'visible',
        width: '100%',
        minHeight: '200px'
      }}
    >
      <ul 
        className="image-box"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '15px',
          listStyle: 'none',
          padding: '0',
          margin: '0',
          width: '100%'
        }}
      >
        {loading ? (
          <>
            {[...Array(15)].map((_, i) => (
              <li key={i} style={{listStyle:'none'}}>
                <div style={{
                  position:'relative',
                  width:'100%',
                  paddingBottom:'100%',
                  background:'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                  backgroundSize:'1000px 100%',
                  animation:'shimmer 2s infinite linear',
                  borderRadius:'8px',
                  overflow:'hidden'
                }}></div>
              </li>
            ))}
          </>
        ) : !images || images.length === 0 ? (
          <li style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
            <p>No images available</p>
          </li>
        ) : (() => {
          const startIndex = (imagesPage - 1) * 15;
          const endIndex = imagesPage * 15;
          const currentPageImages = images.slice(startIndex, endIndex);
          
          console.log('Rendering images:', {
            totalImages: images.length,
            currentPage: imagesPage,
            startIndex,
            endIndex,
            currentPageImages: currentPageImages.length,
            firstItem: currentPageImages[0]
          });

          return currentPageImages.map((item, index) => {
            // Validate item structure
            if (!item || !item.imageId || !item.image) {
              console.warn('Invalid image item at index:', startIndex + index, item);
              return (
                <li key={`invalid-${startIndex + index}`} style={{ 
                  border: '1px solid red', 
                  padding: '10px', 
                  textAlign: 'center' 
                }}>
                  <p>Invalid image data</p>
                </li>
              );
            }

            return (
              <li 
                key={item.imageId}
                style={{
                  border: '1px solid #ccc', // Temporary border to see each item
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  minHeight: '150px'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '150px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title || 'gallery image'}
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    onClick={() => {
                      console.log('Image clicked:', item.image);
                      getSRC(item.image);
                    }}
                    onError={(e) => {
                      console.error('Failed to load image:', item.image);
                      console.log('Trying alternative loading method...');
                      
                      // Try loading without CORS first
                      const img = new Image();
                      img.onload = () => {
                        console.log('Image loaded with alternative method');
                        e.target.src = item.image;
                        e.target.removeAttribute('crossorigin');
                      };
                      img.onerror = () => {
                        console.error('Alternative loading also failed for:', item.image);
                        // Set fallback image
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg==';
                      };
                      img.src = item.image;
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', item.image);
                    }}
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      display: 'block'
                    }}
                  />
                  
                  {/* Debug overlay removed */}
                </div>
                
              </li>
            );
          });
        })()}
                      </ul>
    </div>

    {renderPagination(images?.length || 0, imagesPage, setImagesPage)}
  </div>
                    )}

                    {/* Videos */}
                    {activeTab === "videos" && (
  <div style={{background:'#fff', padding:'20px', borderRadius:'12px'}}>
    {/* Debug info removed */}

    {/* Force visible container with explicit styles */}
    <div 
      className="video-box-container"
      style={{
        display: 'block',
        visibility: 'visible',
        width: '100%',
        minHeight: '200px'
      }}
    >
      <ul 
        className="video-box"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          listStyle: 'none',
          padding: '0',
          margin: '0',
          width: '100%'
        }}
      >
        {loading ? (
          <>
            {[...Array(9)].map((_, i) => (
              <li key={i} style={{listStyle:'none'}}>
                <div style={{
                  borderRadius:'12px',
                  overflow:'hidden',
                  boxShadow:'0 2px 10px rgba(0,0,0,0.08)',
                  background:'#fff',
                  minHeight:'250px'
                }}>
                  <div style={{
                    height:'150px',
                    background:'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                    backgroundSize:'1000px 100%',
                    animation:'shimmer 2s infinite linear'
                  }}></div>
                  <div style={{padding:'10px'}}>
                    <div style={{
                      height:'14px',
                      borderRadius:'4px',
                      background:'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                      backgroundSize:'1000px 100%',
                      animation:'shimmer 2s infinite linear',
                      width:'90%',
                      marginBottom:'8px'
                    }}></div>
                    <div style={{
                      height:'12px',
                      borderRadius:'4px',
                      background:'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                      backgroundSize:'1000px 100%',
                      animation:'shimmer 2s infinite linear',
                      width:'70%'
                    }}></div>
                  </div>
                </div>
              </li>
            ))}
          </>
        ) : !videos || videos.length === 0 ? (
          <li style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
            <p>No videos available</p>
          </li>
        ) : (() => {
          const startIndex = videosPage * 15 - 15;
          const endIndex = videosPage * 15;
          const currentPageVideos = videos.slice(startIndex, endIndex);
          
         /* console.log('Rendering videos:', {
            totalVideos: videos.length,
            currentPage: videosPage,
            startIndex,
            endIndex,
            currentPageVideos: currentPageVideos.length,
            firstItem: currentPageVideos[0]
          });*/

          return currentPageVideos.map((item, index) => {
            // Validate item structure
            if (!item || (!item.videoId && !item.id) || !item.url) {
              console.warn('Invalid video item at index:', startIndex + index, item);
              return (
                <li key={`invalid-${startIndex + index}`} style={{ 
                  border: '1px solid red', 
                  padding: '15px', 
                  textAlign: 'center',
                  borderRadius: '8px',
                  backgroundColor: '#fff5f5'
                }}>
                  <div style={{ color: '#d32f2f', fontSize: '14px' }}>
                    Invalid video data
                  </div>
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
                    Missing: {!item ? 'entire item' : !item.url ? 'url' : 'videoId/id'}
                  </div>
                </li>
              );
            }

            // Extract YouTube video ID with better error handling
            let videoId = null;
            let extractionMethod = '';
            
            try {
              const url = item.url.trim();
              console.log('Processing video URL:', url);
              
              if (url.includes("youtu.be/")) {
                // Handle youtu.be short URLs
                const shortUrlMatch = url.match(/youtu\.be\/([^?&]+)/);
                if (shortUrlMatch) {
                  videoId = shortUrlMatch[1];
                  extractionMethod = 'youtu.be';
                }
              } else if (url.includes("youtube.com")) {
                // Handle full youtube.com URLs
                const match = url.match(/[?&]v=([^&]+)/);
                if (match) {
                  videoId = match[1];
                  extractionMethod = 'youtube.com';
                }
              } else if (url.includes("youtube")) {
                // Try alternative patterns
                const altMatch = url.match(/\/embed\/([^?&]+)/) || url.match(/\/v\/([^?&]+)/);
                if (altMatch) {
                  videoId = altMatch[1];
                  extractionMethod = 'embed/v pattern';
                }
              }
              
              // Clean up video ID (remove any remaining parameters)
              if (videoId) {
                videoId = videoId.split('&')[0].split('?')[0];
              }
              
              console.log('Video ID extraction:', {
                originalUrl: url,
                videoId,
                method: extractionMethod
              });
              
            } catch (error) {
              console.error('Error extracting video ID from URL:', item.url, error);
            }

            const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
            const itemKey = item.videoId || item.id || `video-${startIndex + index}`;

            if (!embedUrl) {
              return (
                <li key={itemKey} style={{ 
                  border: '1px solid #ff9800', 
                  padding: '15px', 
                  textAlign: 'center',
                  borderRadius: '8px',
                  backgroundColor: '#fff8e1'
                }}>
                  <div style={{ color: '#f57c00', fontSize: '14px', marginBottom: '8px' }}>
                    Invalid YouTube URL
                  </div>
                  <div style={{ fontSize: '11px', color: '#666', wordBreak: 'break-all' }}>
                    URL: {item.url}
                  </div>
                  <div style={{ fontSize: '10px', color: '#999', marginTop: '5px' }}>
                    Supported: youtube.com/watch?v=... or youtu.be/...
                                </div>
                              </li>
              );
            }

            return (
              <li 
                key={itemKey}
                style={{
                  border: '1px solid #ccc', // Temporary border
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  minHeight: '200px'
                }}
              >
                <div className="gallery-box" style={{ 
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden'
                  }}>
                  <iframe 
                    src={embedUrl}
                    title={item.title || "YouTube video"}
                    allowFullScreen
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    onLoad={() => {
                      console.log('YouTube iframe loaded successfully:', embedUrl);
                    }}
                    onError={(e) => {
                      console.error('YouTube iframe failed to load:', embedUrl, e);
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                  />
                  
                  {/* Debug overlay */}
                 
                </div>
                
                {/* Video info */}
                {(item.title || item.description) && (
                  <div style={{ 
                    padding: '10px', 
                    backgroundColor: '#f8f9fa',
                    borderTop: '1px solid #eee'
                  }}>
                    {item.title && (
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#333'
                      }}>
                        {item.title}
                      </div>
                    )}
                    {item.description && (
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#666',
                        lineHeight: '1.4',
                        maxHeight: '40px',
                        overflow: 'hidden'
                      }}>
                        {item.description}
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          });
        })()}
                      </ul>
    </div>

    {renderPagination(videos?.length || 0, videosPage, setVideosPage)}
  </div>
                    )}

                    {/* News */}
                   {/* News Room */}
{/* News Room */}
                    {activeTab === "news" && (
  <div style={{background:'#fff', padding:'20px', borderRadius:'12px'}}>
    {/* Debug info removed */}

    {/* Force visible container with explicit styles */}
    <div 
      className="news-box-container"
      style={{
        display: 'block',
        visibility: 'visible',
        width: '100%',
        minHeight: '200px'
      }}
    >
      <ul 
        className="news-box"
        style={{
          display: 'grid',
          gap: '20px',
          listStyle: 'none',
          padding: '0',
          margin: '0',
          width: '100%'
        }}
      >
        {loading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <li key={i} style={{listStyle:'none'}}>
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  background: '#fff',
                  minHeight: '500px'
                }}>
                  <div style={{padding: '16px 16px 8px'}}>
                    <div style={{
                      height: '35px',
                      borderRadius: '4px',
                      background: 'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                      backgroundSize: '1000px 100%',
                      animation: 'shimmer 2s infinite linear',
                      marginBottom: '8px'
                    }}></div>
                  </div>
                  <div style={{
                    height: '220px',
                    background: 'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                    backgroundSize: '1000px 100%',
                    animation: 'shimmer 2s infinite linear'
                  }}></div>
                  <div style={{padding: '16px'}}>
                    <div style={{
                      height: '14px',
                      borderRadius: '4px',
                      background: 'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                      backgroundSize: '1000px 100%',
                      animation: 'shimmer 2s infinite linear',
                      marginBottom: '8px'
                    }}></div>
                    <div style={{
                      height: '14px',
                      borderRadius: '4px',
                      background: 'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                      backgroundSize: '1000px 100%',
                      animation: 'shimmer 2s infinite linear',
                      width: '85%',
                      marginBottom: '16px'
                    }}></div>
                    {[...Array(3)].map((_, j) => (
                      <div key={j} style={{
                        height: '10px',
                        borderRadius: '6px',
                        background: 'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                        backgroundSize: '1000px 100%',
                        animation: 'shimmer 2s infinite linear',
                        marginBottom: '6px'
                      }}></div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </>
        ) : !newsRoom || newsRoom.length === 0 ? (
          <li style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
            <p>No news articles available</p>
          </li>
        ) : (() => {
          const startIndex = newsRoomPage * 15 - 15;
          const endIndex = newsRoomPage * 15;
          const currentPageNews = newsRoom.slice(startIndex, endIndex);
          
        

          return currentPageNews.map((item, index) => {
            // Log the actual item structure for debugging
            console.log('News item at index', startIndex + index, ':', item);
            
            if (!item) {
              return (
                <li key={`invalid-${startIndex + index}`} style={{ 
                  border: '1px solid red', 
                  padding: '15px', 
                  textAlign: 'center',
                  borderRadius: '8px',
                  backgroundColor: '#fff5f5'
                }}>
                  <div style={{ color: '#d32f2f', fontSize: '14px' }}>
                    Null/undefined news item
                              </div>
                            </li>
              );
            }

            // Flexible ID and field handling
            const itemId = item.id || item._id || item.newsId || item.articleId || `news-${startIndex + index}`;
            const newsTitle = item.title || item.headline || item.name || 'Untitled News Article';
            const newsImage = item.image || item.imageUrl || item.photo || '/images/dr-kalam.png';
            
            // Handle links array - your links are in newsLink array
            const newsLink = item.urls || item.links || item.newsLink || [];
            const allLinks = Array.isArray(newsLink) ? newsLink.map((url, idx) => ({
              url: url,
              label: `Article Link ${idx + 1}`
            })) : [];

            /*console.log('Processing news item:', {
              id: itemId,
              title: newsTitle,
              image: newsImage,
              newsLinkArray: newsLink,
              totalLinks: allLinks.length,
              firstLink: allLinks[0]?.url,
              availableFields: Object.keys(item)
            }); */

            return (
              <li 
                key={itemId}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  
                  overflow: 'hidden',
                 
                  
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  minHeight: '50px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <div className="gallery-box" style={{
                  height: '100%',
                  display: 'flex',
                  
                  flexDirection: 'column'
                }}>
                  {/* Title Section - Above Image */}
                  <div style={{
                    borderBottom: '1px solid #f0f0f0',
                   
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 10px',
                    minHeight: '64px'
                  }}>
                    <h4 style={{
                      margin: '0',
                      fontSize: '16px',
                      lineHeight: '1.4',
                      color: '#333',
                      fontWeight: '600',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {newsTitle}
                    </h4>
                  </div>

                  {/* Image Section - fixed size */}
                  <div style={{ 
                    position: 'relative',
                    width: '100%',
                    height: '220px', // fixed height for uniform cards
                    overflow: 'hidden'
                  }}>
                    <div className="gallery-img" style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'white'
                    }}>
                      <OptimizedImage
                        src={newsImage}
                        fill
                        alt={`News: ${newsTitle}`}
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                      
                      {/* Debug overlay */}
                      <div style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        fontSize: '9px',
                        padding: '2px 5px',
                        borderRadius: '3px'
                      }}>
                        
                      </div>
                      
                     
                    
                          
                        
                      
                    </div>
                  </div>

                  {/* Links Section - Below Image */}
                  <div style={{
                    marginTop: '8px'
                  }}>
                    {/* Description if available */}
                    {item.description && (
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        lineHeight: '1.5',
                        marginBottom: '12px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.description}
                      </div>
                    )}

                  {/* Links area has fixed height and shows first 3 links; if more, collapsible list holds the rest */}
                  {allLinks.length > 0 ? (
                    (() => {
                      const firstThree = allLinks.slice(0,2)
                      const remaining = allLinks.slice(2)
                      const renderRow = (linkItem, linkIndex, zebraBase=0) => {
                        let domain = ''
                        try { domain = new URL(linkItem.url).hostname.replace(/^www\./,'') } catch(e) {}
                        const zebra = (zebraBase + linkIndex) % 2 === 1
                        return (
                          <a
                            key={`${zebraBase}-${linkIndex}`}
                            href={linkItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={linkItem.url}
                            style={{
                              display: 'grid', gridTemplateColumns: '18px 1fr auto', alignItems: 'center',
                              gap: '10px', padding: '10px 8px', textDecoration: 'none',
                              background: zebra ? '#f9fbff' : '#ffffff', borderRadius: '6px', color: '#1b67c9',
                              border: '1px solid #f0f3f7', marginBottom: '6px'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#f5faff' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = zebra ? '#f9fbff' : '#ffffff' }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`https://www.google.com/s2/favicons?sz=16&domain=${domain || 'example.com'}`} alt="" style={{ width: '16px', height: '16px', borderRadius: '2px', opacity: 0.9 }} />
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: '13px', fontWeight: 500, color: '#22313f', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {linkItem.label}
                              </div>
                              {domain && (<div style={{ fontSize: '11px', color: '#7b8794', marginTop: '2px' }}>{domain}</div>)}
                            </div>
                            <span style={{ fontSize: '12px', color: '#28a745' }}>↗</span>
                          </a>
                        )
                      }

                      return (
                        <div style={{ marginBottom: '12px' }}>
                          {/* Header */}
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            background: 'linear-gradient(180deg,#f9fbff 0%, #f2f5f9 100%)',
                            border: '1px solid #e7ecf2', borderRadius: '10px',
                            padding: '10px 12px', marginBottom: '8px'
                          }}>
                            <span style={{ fontSize: '13px', color: '#2a2f36', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0b74da', display: 'inline-block' }} />
                              Article Links
                            </span>
                            <span style={{ marginLeft: 'auto', background: '#e9f5ff', color: '#0b74da', borderRadius: '999px', padding: '2px 10px', fontSize: '12px', fontWeight: 600 }}>{allLinks.length}</span>
                          </div>

                          {/* Fixed links area */}
                          <div style={{ border: '1px solid #e7ecf2', borderRadius: '8px', background: '#ffffff', padding: '6px', minHeight: '160px', maxHeight: '220px', overflow: 'auto' }}>
                            {/* First 3 visible always */}
                            <div>
                              {firstThree.map((l, i) => renderRow(l, i, 0))}
                            </div>
                            {/* Remaining inside collapsible, scrollable body */}
                            {remaining.length > 0 && (
                              <div style={{ marginTop: '4px' }}>
                                {/* Expanded list appears ABOVE the control; no inner scrollbar, outer container scrolls */}
                                {expandedLinksMap[itemId] && (
                                  <div
                                    style={{
                                      marginBottom: '6px',
                                      paddingRight: '2px',
                                      borderTop: '1px dashed #e7ecf2',
                                      paddingTop: '6px'
                                    }}
                                  >
                                    {remaining.map((l, i) => renderRow(l, i, firstThree.length))}
                                  </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                  <button
                                    type="button"
                                    onClick={() => setExpandedLinksMap((p) => ({ ...p, [itemId]: !p[itemId] }))}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0b74da', fontSize: '12px', padding: '6px 10px', background: 'transparent', border: 'none' }}
                                  >
                                    <span style={{ fontWeight: 600, marginLeft: '4px' }}>{expandedLinksMap[itemId] ? 'Show less' : 'Show more'}</span>
                                    <span style={{ marginLeft: '4px', background: '#eef6ff', color: '#0b74da', borderRadius: '999px', padding: '0 8px' }}>{remaining.length}</span>
                                    <span aria-hidden style={{ color: '#8a94a4', fontSize: '12px' }}>{expandedLinksMap[itemId] ? '▴' : '▾'}</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })()
                  ) : (
                      <div style={{
                        marginBottom: '12px',
                        padding: '12px',
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ffeaa7',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#856404',
                        textAlign: 'center'
                      }}>
                        No links available for this article
                      </div>
                    )}

                    {/* Metadata */}
                    <div style={{ 
                      fontSize: '10px',
                      color: '#999',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: '1px solid #f0f0f0',
                      paddingTop: '8px'
                    }}>
                      <span>
                       
                        {item.source && ` • ${item.source}`}
                      </span>
                      <span style={{ color: '#007bff' }}>
                     
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          });
        })()}
                      </ul>
    </div>

    {renderPagination(newsRoom?.length || 0, newsRoomPage, setNewsRoomPage)}
  </div>
)}

                   {/* Press Clippings */}
                    {activeTab === "press" && (
  <div>
   

    <div className="press-box-container" >
      <ul className="press-box" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:'20px',listStyle:'none',padding:'0',margin:'0',width:'100%'}}>
        {loading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <li key={i} style={{listStyle:'none'}}>
                <div style={{
                  borderRadius:'12px',
                  overflow:'hidden',
                  boxShadow:'0 2px 10px rgba(0,0,0,0.08)',
                  background:'#fff',
                  minHeight:'450px'
                }}>
                  <div style={{
                    height:'300px',
                    background:'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                    backgroundSize:'1000px 100%',
                    animation:'shimmer 2s infinite linear'
                  }}></div>
                  <div style={{padding:'16px', backgroundColor:'#f8f9fa'}}>
                    <div style={{
                      height:'14px',
                      borderRadius:'4px',
                      background:'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                      backgroundSize:'1000px 100%',
                      animation:'shimmer 2s infinite linear',
                      width:'60%',
                      marginBottom:'8px'
                    }}></div>
                    <div style={{
                      height:'12px',
                      borderRadius:'4px',
                      background:'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                      backgroundSize:'1000px 100%',
                      animation:'shimmer 2s infinite linear',
                      width:'40%',
                      marginBottom:'12px'
                    }}></div>
                    <div style={{
                      height:'32px',
                      borderRadius:'16px',
                      background:'linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)',
                      backgroundSize:'1000px 100%',
                      animation:'shimmer 2s infinite linear',
                      width:'120px',
                      margin:'0 auto'
                    }}></div>
                  </div>
                </div>
              </li>
            ))}
          </>
        ) : !pressclipping || pressclipping.length === 0 ? (
          <li style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}><p>No press clippings available</p></li>
        ) : (() => {
          const startIndex = pressclippingPage * 15 - 15;
          const endIndex = pressclippingPage * 15;
          const currentPagePress = pressclipping.slice(startIndex, endIndex);

          return currentPagePress.map((item, index) => {
            if (!item) {
              return (
                <li key={`invalid-${startIndex + index}`} style={{border:'1px solid red',padding:'15px',textAlign:'center',borderRadius:'8px',backgroundColor:'#fff5f5'}}>
                  <div style={{ color:'#d32f2f', fontSize:'14px' }}>Null/undefined press clipping</div>
                            </li>
              );
            }

            const itemId = item.imageId || item.id || item._id || item.pressId || `press-${startIndex + index}`;
            const pressTitle = item.title || item.headline || item.name || 'Press Clipping';
            const pressImage = item.image || item.imageUrl || item.photo || '/images/dr-kalam.png';
            const pressDate = item.date || item.publishedDate || item.createdAt;
            //console.log('press',pressDate);
            const pressSource = item.source || item.publication || item.newspaper;

            return (
              <li key={itemId} style={{
                background:'#ffffff',
                border:'1px solid #eee',
                borderRadius:'8px',
                overflow:'hidden',
                display:'flex',
                flexDirection:'column',
                height:'100%'
              }}>
                <div className="gallery-img" style={{position:'relative',height:'300px',overflow:'hidden',cursor:'pointer',backgroundColor:'#f5f5f5'}} onClick={() => getSRC(pressImage)}>
                  <OptimizedImage src={pressImage} fill alt={`Press Clipping: ${pressTitle}`} style={{objectFit:'cover'}} />
                </div>
                <div style={{padding:'12px 12px 12px'}}>
                  <div style={{fontSize:'12px',color:'#666',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                    <span style={{fontWeight:500}}>{pressSource && <span style={{color:'#007bff'}}>📰 {pressSource}</span>}</span>
                  </div>
                  {item.description && (
                    <div style={{fontSize:'11px',color:'#666',lineHeight:'1.5',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                      {item.description}
                    </div>
                  )}
                </div>
              </li>
            );
          });
        })()}
                      </ul>
    </div>

    {renderPagination(pressclipping?.length || 0, pressclippingPage, setPressclippingPage)}
  </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Popup */}
        {showPop && (
          <div 
            className='image-popcover' 
            style={{ 
              zIndex: 99999,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => setShowPop(false)}
          >
            <div 
              className='image-popbox'
              style={{
                position: 'relative',
                width: '90vw',
                maxWidth: '1200px',
                maxHeight: '90vh',
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className='image-popclose' 
                onClick={() => setShowPop(false)} 
                style={{ 
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  zIndex: 100000,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
              >
                ×
              </div>
              <OptimizedImage
                src={popimg}
                alt="Gallery"
                width={800}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '90vh',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  )
}
