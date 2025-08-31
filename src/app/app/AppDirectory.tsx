'use client';

import { useState, useMemo } from 'react';

interface AppItem {
  title: string;
  description: string;
  category: string;
  price: 'Gratis' | 'A pagamento';
  link: string;
  status: 'Disponibile' | 'In sviluppo' | 'Presto disponibile';
}

interface AppDirectoryProps {
  apps: AppItem[];
}

export default function AppDirectory({ apps }: AppDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [selectedPrice, setSelectedPrice] = useState('Tutti');
  const [selectedStatus, setSelectedStatus] = useState('Tutti');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['Tutti', ...Array.from(new Set(apps.map(app => app.category)))];
    return cats;
  }, [apps]);

  // Filter apps based on all criteria
  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesSearch = 
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Tutti' || app.category === selectedCategory;
      const matchesPrice = selectedPrice === 'Tutti' || app.price === selectedPrice;
      const matchesStatus = selectedStatus === 'Tutti' || app.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
    });
  }, [apps, searchTerm, selectedCategory, selectedPrice, selectedStatus]);

  const freeApps = filteredApps.filter(app => app.price === 'Gratis');
  const paidApps = filteredApps.filter(app => app.price === 'A pagamento');

  return (
    <div className="content-section">
      {/* Search and Filters */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '20px',
        marginBottom: '3rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="🔍 Cerca app per nome, descrizione o categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '50px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              outline: 'none',
              background: 'rgba(255,255,255,0.95)'
            }}
          />
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
          
          {/* Category Filters */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              🏷️ Categoria
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: selectedCategory === category 
                      ? 'rgba(255,255,255,1)' 
                      : 'rgba(255,255,255,0.2)',
                    color: selectedCategory === category ? '#764ba2' : 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filters */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              💰 Prezzo
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Tutti', 'Gratis', 'A pagamento'].map(price => (
                <button
                  key={price}
                  onClick={() => setSelectedPrice(price)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: selectedPrice === price 
                      ? 'rgba(255,255,255,1)' 
                      : 'rgba(255,255,255,0.2)',
                    color: selectedPrice === price ? '#764ba2' : 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {price === 'A pagamento' ? 'Premium' : price}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filters */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              🚀 Stato
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Tutti', 'Disponibile', 'In sviluppo', 'Presto disponibile'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: selectedStatus === status 
                      ? 'rgba(255,255,255,1)' 
                      : 'rgba(255,255,255,0.2)',
                    color: selectedStatus === status ? '#764ba2' : 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem', 
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1rem'
        }}>
          📊 Trovate {filteredApps.length} app{filteredApps.length === 1 ? '' : ''} 
          {searchTerm && ` per "${searchTerm}"`}
        </div>
      </div>

      {filteredApps.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '20px',
          border: '2px dashed #ccc'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.5rem', color: '#666', marginBottom: '1rem' }}>
            Nessuna app trovata
          </h3>
          <p style={{ color: '#888' }}>
            Prova a modificare i filtri o il termine di ricerca
          </p>
        </div>
      ) : (
        <>
          {/* Free Apps Section */}
          {freeApps.length > 0 && (
            <div className="apps-section" style={{ marginBottom: '3rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '2rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                borderRadius: '15px',
                color: 'white'
              }}>
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>🎁 App Gratuite</h2>
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {freeApps.length} disponibili
                </span>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '2rem' 
              }}>
                {freeApps.map((app, index) => (
                  <div key={index} style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    border: '3px solid #11998e',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                  }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h3 style={{ 
                        fontSize: '1.4rem', 
                        marginBottom: '0.8rem',
                        color: '#2d3748'
                      }}>
                        {app.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          background: '#11998e',
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {app.category}
                        </span>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          background: app.status === 'Disponibile' ? '#38ef7d' : '#ffa726',
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                    <p style={{ 
                      color: '#666', 
                      lineHeight: '1.6',
                      marginBottom: '2rem',
                      fontSize: '0.95rem'
                    }}>
                      {app.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#11998e'
                      }}>
                        🎁 GRATIS
                      </span>
                      <a 
                        href={app.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '0.8rem 1.5rem',
                          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '25px',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {app.status === 'Disponibile' ? '⬇️ Scarica' : '🔔 Notificami'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Premium Apps Section */}
          {paidApps.length > 0 && (
            <div className="apps-section">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '2rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '15px',
                color: 'white'
              }}>
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>💎 App Premium</h2>
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {paidApps.length} disponibili
                </span>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '2rem' 
              }}>
                {paidApps.map((app, index) => (
                  <div key={index} style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    border: '3px solid #764ba2',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '20px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      PREMIUM
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                      <h3 style={{ 
                        fontSize: '1.4rem', 
                        marginBottom: '0.8rem',
                        color: '#2d3748'
                      }}>
                        {app.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          background: '#764ba2',
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {app.category}
                        </span>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          background: app.status === 'Disponibile' ? '#38ef7d' : '#ffa726',
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                    <p style={{ 
                      color: '#666', 
                      lineHeight: '1.6',
                      marginBottom: '2rem',
                      fontSize: '0.95rem'
                    }}>
                      {app.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#764ba2'
                      }}>
                        💎 PREMIUM
                      </span>
                      <a 
                        href={app.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '0.8rem 1.5rem',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '25px',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {app.status === 'Disponibile' ? '💳 Acquista' : '🚀 Pre-ordina'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}