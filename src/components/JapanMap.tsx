import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const markers = [
  { id: 'tokyo', name: 'Tokyo (Shibuya)', lat: 35.6595, lng: 139.7005, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=500&auto=format&fit=crop', terrain: 'Urban / Neon', cars: 'Nissan GT-R', race: 'Street Scene' },
  { id: 'fuji', name: 'Mt. Fuji Speedway', lat: 35.3717, lng: 138.9267, img: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=500&auto=format&fit=crop', terrain: 'Track / High Speed', cars: 'Toyota Supra MK4', race: 'Circuit Racing' },
  { id: 'daikoku', name: 'Daikoku PA', lat: 35.4614, lng: 139.6782, img: 'https://images.unsplash.com/photo-1580658325817-68ce01d118e1?q=80&w=500&auto=format&fit=crop', terrain: 'Parking / Meetup', cars: 'Mazda RX-7', race: 'Car Meet / Showoff' },
  { id: 'hakone', name: 'Hakone Turnpike', lat: 35.1872, lng: 139.0525, img: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=500&auto=format&fit=crop', terrain: 'Mountain / Touge', cars: 'Toyota AE86', race: 'Touge Battle / Drift' },
  { id: 'osaka', name: 'Osaka (Dotonbori)', lat: 34.6687, lng: 135.5013, img: 'https://images.unsplash.com/photo-1590559899731-a382839cecd5?q=80&w=500&auto=format&fit=crop', terrain: 'Urban / Tight', cars: 'Honda Civic Type R', race: 'Street Sprint' },
  { id: 'kyoto', name: 'Kyoto', lat: 35.0116, lng: 135.7681, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=500&auto=format&fit=crop', terrain: 'Historic / Scenic', cars: 'Subaru Impreza WRX', race: 'Point-to-Point' },
  { id: 'suzuka', name: 'Suzuka Circuit', lat: 34.8431, lng: 136.5330, img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=500&auto=format&fit=crop', terrain: 'Track / High Speed', cars: 'Porsche 911 GT3 RS', race: 'Circuit Racing' },
  { id: 'hokkaido', name: 'Hokkaido', lat: 43.2203, lng: 142.8635, img: 'https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?q=80&w=500&auto=format&fit=crop', terrain: 'Snow / Rally', cars: 'Mitsubishi Lancer Evo', race: 'Dirt / Snow Rally' },
  { id: 'hiroshima', name: 'Hiroshima', lat: 34.3853, lng: 132.4553, img: 'https://images.unsplash.com/photo-1553054017-314163281b5e?q=80&w=500&auto=format&fit=crop', terrain: 'Coastal / Urban', cars: 'Mazda MX-5', race: 'Coastal Sprint' },
  { id: 'yokohama', name: 'Yokohama', lat: 35.4437, lng: 139.6380, img: 'https://images.unsplash.com/photo-1542640244-7e672d6cb466?q=80&w=500&auto=format&fit=crop', terrain: 'Dockyards / Industrial', cars: 'Nissan Silvia S15', race: 'Drift Zone' },
  { id: 'shuto', name: 'Shuto Expressway (C1 Loop)', lat: 35.6812, lng: 139.7671, img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=500&auto=format&fit=crop', terrain: 'Urban / Highway', cars: 'Nissan Skyline R34', race: 'Highway Battle / Speed Trap' },
];

const JapanMap = React.memo(function JapanMap() {
  const [popupInfo, setPopupInfo] = useState<typeof markers[0] | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div 
      className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 backdrop-blur-md"
      onClick={() => setIsInteractive(true)}
      onMouseLeave={() => setIsInteractive(false)}
      style={{ willChange: 'transform', contain: 'layout' }}
    >
      <style>{`
        .maplibregl-popup-content {
          padding: 0 !important;
          background: transparent !important;
          border-radius: 0.5rem !important;
          box-shadow: none !important;
        }
        .maplibregl-popup-tip {
          border-top-color: #18181b !important; /* zinc-900 */
        }
      `}</style>
      
      {!isInteractive && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/80 text-white px-6 py-3 rounded-full font-bold tracking-widest text-sm border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            CLICK TO INTERACT WITH MAP
          </div>
        </div>
      )}

      <Map
        initialViewState={{
          longitude: 138.2529,
          latitude: 36.2048,
          zoom: 5.2
        }}
        maxBounds={[
          [122.0, 20.0], // Southwest coordinates
          [154.0, 50.0]  // Northeast coordinates
        ]}
        minZoom={4.5}
        maxZoom={10}
        scrollZoom={false}
        dragPan={isInteractive}
        doubleClickZoom={isInteractive}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        mapLib={maplibregl}
        style={{ width: '100%', height: '100%' }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.lng}
            latitude={marker.lat}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(marker);
            }}
          >
            <div 
              className="cursor-pointer transform hover:scale-125 transition-transform"
              onMouseEnter={() => setPopupInfo(marker)}
              onMouseLeave={() => setPopupInfo(null)}
            >
              <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-60"></div>
                <div className="relative bg-zinc-900 border-2 border-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.8)]">
                  <span className="text-red-500 font-black italic text-xs">H</span>
                </div>
              </div>
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="bottom"
            offset={15}
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            closeOnClick={false}
            className="z-50"
            maxWidth="280px"
          >
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700 rounded-lg shadow-2xl shadow-red-600/20 overflow-hidden flex flex-col w-[280px] relative">
              {/* Slanted lines background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="w-[200%] h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)] transform -skew-x-15"></div>
              </div>
              
              <div className="h-32 w-full relative z-10">
                <ImageWithFallback src={popupInfo.img} alt={popupInfo.name} fallbackText={popupInfo.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent pointer-events-none"></div>
              </div>
              <div className="p-4 pt-2 relative z-10">
                <div className="text-white font-black text-lg mb-3 leading-tight heading-italic drop-shadow-md text-shadow-strong">{popupInfo.name}</div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center border-b border-zinc-700/50 pb-1">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Terrain</span>
                    <span className="text-white text-xs font-medium">{popupInfo.terrain}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-700/50 pb-1">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Rec. Car</span>
                    <span className="text-red-400 text-xs font-medium italic">{popupInfo.cars}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-700/50 pb-1">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Race Type</span>
                    <span className="text-white text-xs font-medium">{popupInfo.race}</span>
                  </div>
                </div>
                
                <button className="w-full bg-red-600 text-white font-orbitron font-black italic uppercase tracking-widest py-2.5 rounded hover:bg-[#FFB7C5] hover:text-black transition-all duration-300 text-sm shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_20px_rgba(255,183,197,0.5)] transform -skew-x-12 burnout-btn">
                  <span className="block transform skew-x-12">FAST TRAVEL</span>
                </button>
              </div>
            </div>
          </Popup>
        )}
      </Map>
      
      {/* HUD Overlay */}
      <div className="absolute top-[60px] left-5 text-zinc-400 font-mono text-xs z-10 pointer-events-none">
        <div>SYS: ONLINE</div>
        <div>MAP: JAPAN EXPEDITION</div>
      </div>

      {/* New Map Badge - Top Left */}
      <div
        className="absolute z-30 inline-flex items-center gap-2 bg-red-600/90 backdrop-blur-md text-[#FFFFFF] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-500/50 cursor-pointer hover:bg-[#FFB7C5] hover:text-black hover:shadow-[0_0_20px_rgba(255,183,197,0.5)] hover:border-[#FFB7C5] transition-all duration-300 animate-pulse group"
        style={{ top: '20px', left: '20px' }}
      >
        <MapPin className="w-4 h-4 text-[#FFFFFF] group-hover:text-black transition-colors duration-300" />
        <span className="text-[#FFFFFF] font-bold group-hover:text-black transition-colors duration-300">New Map: Hakone & Mt. Fuji</span>
      </div>
    </div>
  );
});

export default JapanMap;
