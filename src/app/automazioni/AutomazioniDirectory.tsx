'use client';

import { useState, useMemo } from 'react';

interface AutomationItem {
  title: string;
  description: string;
  category: string;
  complexity: 'Semplice' | 'Intermedio' | 'Avanzato';
  price: 'Gratis' | 'A pagamento';
  platforms: string[];
  timeToImplement: string;
  link: string;
  status: 'Disponibile' | 'In sviluppo' | 'Presto disponibile';
}

interface AutomazioniDirectoryProps {
  automations: AutomationItem[];
}

export default function AutomazioniDirectory({ automations }: AutomazioniDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [selectedComplexity, setSelectedComplexity] = useState('Tutti');
  const [selectedPrice, setSelectedPrice] = useState('Tutti');
  const [selectedStatus, setSelectedStatus] = useState('Tutti');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['Tutti', ...Array.from(new Set(automations.map(automation => automation.category)))];
    return cats;
  }, [automations]);

  // Filter automations based on all criteria
  const filteredAutomations = useMemo(() => {
    return automations.filter(automation => {
      const matchesSearch = 
        automation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        automation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        automation.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        automation.platforms.some(platform => platform.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Tutti' || automation.category === selectedCategory;
      const matchesComplexity = selectedComplexity === 'Tutti' || automation.complexity === selectedComplexity;
      const matchesPrice = selectedPrice === 'Tutti' || automation.price === selectedPrice;
      const matchesStatus = selectedStatus === 'Tutti' || automation.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesComplexity && matchesPrice && matchesStatus;
    });
  }, [automations, searchTerm, selectedCategory, selectedComplexity, selectedPrice, selectedStatus]);

  const freeAutomations = filteredAutomations.filter(automation => automation.price === 'Gratis');
  const paidAutomations = filteredAutomations.filter(automation => automation.price === 'A pagamento');

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Semplice': return '#10b981'; // green
      case 'Intermedio': return '#f59e0b'; // yellow
      case 'Avanzato': return '#ef4444'; // red
      default: return '#6b7280';
    }
  };

  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'Semplice': return '🟢';
      case 'Intermedio': return '🟡';
      case 'Avanzato': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="content-section">
      {/* Search and Filters */}
      <div style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        padding: '2rem',
        borderRadius: '20px',
        marginBottom: '3rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="🔍 Cerca automazioni per nome, descrizione, categoria o piattaforma..."
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.5rem' }}>
          
          {/* Category Filters */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              🏷️ Categoria
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {categories.slice(0, 4).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: selectedCategory === category 
                      ? 'rgba(255,255,255,1)' 
                      : 'rgba(255,255,255,0.2)',
                    color: selectedCategory === category ? '#f5576c' : 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {category}
                </button>
              ))}
              {categories.length > 4 && (
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>
                  +{categories.length - 4} altre
                </div>
              )}
            </div>
          </div>

          {/* Complexity Filters */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              ⚡ Difficoltà
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Tutti', 'Semplice', 'Intermedio', 'Avanzato'].map(complexity => (
                <button
                  key={complexity}
                  onClick={() => setSelectedComplexity(complexity)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: selectedComplexity === complexity 
                      ? 'rgba(255,255,255,1)' 
                      : 'rgba(255,255,255,0.2)',
                    color: selectedComplexity === complexity ? '#f5576c' : 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {complexity !== 'Tutti' && getComplexityIcon(complexity)} {complexity}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filters */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              💰 Prezzo
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Tutti', 'Gratis', 'A pagamento'].map(price => (
                <button
                  key={price}
                  onClick={() => setSelectedPrice(price)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: selectedPrice === price 
                      ? 'rgba(255,255,255,1)' 
                      : 'rgba(255,255,255,0.2)',
                    color: selectedPrice === price ? '#f5576c' : 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {price === 'A pagamento' ? '💎 Premium' : price === 'Gratis' ? '🎁 Gratis' : price}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filters */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              🚀 Stato
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Tutti', 'Disponibile', 'In sviluppo', 'Presto disponibile'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: selectedStatus === status 
                      ? 'rgba(255,255,255,1)' 
                      : 'rgba(255,255,255,0.2)',
                    color: selectedStatus === status ? '#f5576c' : 'white',
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
          📊 Trovate {filteredAutomations.length} automazioni 
          {searchTerm && ` per "${searchTerm}"`}
          {selectedComplexity !== 'Tutti' && ` • ${selectedComplexity}`}
          {selectedCategory !== 'Tutti' && ` • ${selectedCategory}`}
        </div>
      </div>

      {filteredAutomations.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '20px',
          border: '2px dashed #ccc'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.5rem', color: '#666', marginBottom: '1rem' }}>
            Nessuna automazione trovata
          </h3>
          <p style={{ color: '#888' }}>
            Prova a modificare i filtri o il termine di ricerca
          </p>
        </div>
      ) : (
        <>
          {/* Free Automations Section */}
          {freeAutomations.length > 0 && (
            <div className="automations-section" style={{ marginBottom: '3rem' }}>
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
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>🎁 Automazioni Gratuite</h2>
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {freeAutomations.length} disponibili
                </span>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
                gap: '2rem' 
              }}>
                {freeAutomations.map((automation, index) => (
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
                        {automation.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          background: '#11998e',
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {automation.category}
                        </span>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          background: getComplexityColor(automation.complexity),
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {getComplexityIcon(automation.complexity)} {automation.complexity}
                        </span>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          background: automation.status === 'Disponibile' ? '#38ef7d' : '#ffa726',
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {automation.status}
                        </span>
                      </div>
                    </div>
                    <p style={{ 
                      color: '#666', 
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      fontSize: '0.95rem'
                    }}>
                      {automation.description}
                    </p>
                    
                    <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#777' }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong>⚙️ Piattaforme:</strong> {automation.platforms.join(', ')}
                      </div>
                      <div>
                        <strong>⏱️ Implementazione:</strong> {automation.timeToImplement}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#11998e'
                      }}>
                        🎁 GRATIS
                      </span>
                      <a 
                        href={automation.link} 
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
                        {automation.status === 'Disponibile' ? '⬇️ Scarica' : '🔔 Notificami'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Premium Automations Section */}
          {paidAutomations.length > 0 && (
            <div className="automations-section">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '2rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '15px',
                color: 'white'
              }}>
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>💎 Automazioni Premium</h2>
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {paidAutomations.length} disponibili
                </span>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
                gap: '2rem' 
              }}>
                {paidAutomations.map((automation, index) => (
                  <div key={index} style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    border: '3px solid #f5576c',
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
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
                        {automation.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          background: '#f5576c',
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {automation.category}
                        </span>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          background: getComplexityColor(automation.complexity),
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {getComplexityIcon(automation.complexity)} {automation.complexity}
                        </span>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          background: automation.status === 'Disponibile' ? '#38ef7d' : '#ffa726',
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {automation.status}
                        </span>
                      </div>
                    </div>
                    <p style={{ 
                      color: '#666', 
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      fontSize: '0.95rem'
                    }}>
                      {automation.description}
                    </p>
                    
                    <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#777' }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong>⚙️ Piattaforme:</strong> {automation.platforms.join(', ')}
                      </div>
                      <div>
                        <strong>⏱️ Implementazione:</strong> {automation.timeToImplement}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#f5576c'
                      }}>
                        💎 PREMIUM
                      </span>
                      <a 
                        href={automation.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '0.8rem 1.5rem',
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '25px',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {automation.status === 'Disponibile' ? '💳 Acquista' : '🚀 Pre-ordina'}
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