'use client';

import React, { useState } from 'react';
import { FactPack, MatchMetadata, MatchEvent } from '@/lib/types';
import { Crosshair, Layers, Compass, MoveRight } from 'lucide-react';

interface PitchVisualizerProps {
  factPack: FactPack | null;
  match?: MatchMetadata;
  currentEvent?: MatchEvent | null;
  availableIncidents?: FactPack[];
  onSelectIncident?: (incidentId: string) => void;
}

export function PitchVisualizer({
  factPack,
  match,
  availableIncidents = [],
  onSelectIncident
}: PitchVisualizerProps) {
  const [showVectors, setShowVectors] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [showOpponents, setShowOpponents] = useState(true);
  const [activePin, setActivePin] = useState<'key' | 'opponent' | null>(null);

  if (!factPack) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center gap-3 shadow-xs">
        <Crosshair className="w-8 h-8 text-slate-300" />
        <p className="text-sm font-semibold text-slate-600">Pitch Telemetry Ready</p>
        <p className="text-xs text-slate-400">Select an incident to view dynamic spatial tracking</p>
      </div>
    );
  }

  const { category, coordinates, telemetry, keyPlayer, opponentPlayer, team, minute, incidentId } = factPack;

  // Normalized coordinates for standard SVG pitch (0-100 x 0-65)
  const posX = coordinates.x;
  const posY = (coordinates.y / 100) * 65;

  // Derive opponent position dynamically based on geometry if opponent exists
  const oppX =
    coordinates.x > 80
      ? coordinates.x - 3.5
      : coordinates.x < 20
      ? coordinates.x + 3.5
      : coordinates.x + 4.0;
  const oppY =
    coordinates.y > 50
      ? Math.max(10, ((coordinates.y - 8) / 100) * 65)
      : Math.min(55, ((coordinates.y + 8) / 100) * 65);

  // Pitch sector classification
  const sectorLabel =
    posX < 33
      ? `${match?.homeTeam || 'Home'} Defensive Third`
      : posX > 66
      ? `${match?.homeTeam || 'Home'} Attacking Third`
      : 'Midfield Transition Corridor';

  const homeInitials = (match?.homeTeam || 'Home').slice(0, 3).toUpperCase();
  const awayInitials = (match?.awayTeam || 'Away').slice(0, 3).toUpperCase();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
      {/* Visualizer Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-50 text-purple-900 border border-purple-200">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Interactive 2D Spatial Pitch &amp; Hawk-Eye Tracking
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">
                CALIBRATED
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Incident: <span className="text-slate-900 font-bold">{minute}&apos; {category.replace('_', ' ')}</span> — {keyPlayer}
            </p>
          </div>
        </div>

        {/* View Layer Toggles */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setShowVectors(!showVectors)}
            className={`px-2.5 py-1 rounded font-bold transition cursor-pointer text-[11px] ${
              showVectors ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Vectors
          </button>
          <button
            onClick={() => setShowZones(!showZones)}
            className={`px-2.5 py-1 rounded font-bold transition cursor-pointer text-[11px] ${
              showZones ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Zones
          </button>
          <button
            onClick={() => setShowOpponents(!showOpponents)}
            className={`px-2.5 py-1 rounded font-bold transition cursor-pointer text-[11px] ${
              showOpponents ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Opponents
          </button>
        </div>
      </div>

      {/* SVG Football Pitch Field */}
      <div className="relative aspect-[100/65] w-full rounded-xl overflow-hidden border-2 border-emerald-800 bg-[#166534] shadow-inner select-none">
        {/* Pitch Grass Stripes (Alternating turf lanes) */}
        <div className="absolute inset-0 flex pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full ${i % 2 === 0 ? 'bg-black/10' : 'bg-transparent'}`}
            />
          ))}
        </div>

        {/* Direction of Attack Badges */}
        <div className="absolute top-2 left-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs text-[10px] text-white/90 font-mono font-bold border border-white/20">
          <span>{homeInitials}</span>
          <MoveRight className="w-3 h-3 text-emerald-300" />
          <span>{awayInitials}</span>
        </div>

        {/* Interactive SVG Pitch Markings */}
        <svg viewBox="0 0 100 65" className="absolute inset-0 w-full h-full stroke-white/70 fill-none stroke-[0.4]">
          {/* Outer Boundary & Turf Border */}
          <rect x="2" y="2" width="96" height="61" />

          {/* Halfway Line */}
          <line x1="50" y1="2" x2="50" y2="63" strokeDasharray="none" />

          {/* Centre Circle & Spot */}
          <circle cx="50" cy="32.5" r="9.15" />
          <circle cx="50" cy="32.5" r="0.6" className="fill-white" />

          {/* Left Penalty Area */}
          <rect x="2" y="14" width="16.5" height="37" />
          {/* Left 6-Yard Box */}
          <rect x="2" y="23" width="5.5" height="19" />
          {/* Left Penalty Spot & Arc */}
          <circle cx="11" cy="32.5" r="0.6" className="fill-white" />
          <path d="M 18.5 25.5 A 9.15 9.15 0 0 1 18.5 39.5" />

          {/* Right Penalty Area */}
          <rect x="81.5" y="14" width="16.5" height="37" />
          {/* Right 6-Yard Box */}
          <rect x="92.5" y="23" width="5.5" height="19" />
          {/* Right Penalty Spot & Arc */}
          <circle cx="89" cy="32.5" r="0.6" className="fill-white" />
          <path d="M 81.5 25.5 A 9.15 9.15 0 0 0 81.5 39.5" />

          {/* Tactical Zones Overlay */}
          {showZones && (
            <g className="stroke-white/20 stroke-[0.2]">
              <line x1="33" y1="2" x2="33" y2="63" strokeDasharray="1 1" />
              <line x1="66" y1="2" x2="66" y2="63" strokeDasharray="1 1" />
              <line x1="2" y1="21.6" x2="98" y2="21.6" strokeDasharray="1 1" />
              <line x1="2" y1="43.3" x2="98" y2="43.3" strokeDasharray="1 1" />
            </g>
          )}

          {/* DYNAMIC INCIDENT VISUALIZATIONS */}

          {/* 1. PENALTY: Contact cone, slide angle, and distance delta */}
          {category === 'PENALTY' && showVectors && (
            <g>
              <circle
                cx={posX}
                cy={posY}
                r="3.8"
                stroke="#38bdf8"
                strokeWidth="0.6"
                strokeDasharray="1.2 0.8"
                fill="#38bdf8"
                fillOpacity="0.18"
              />
              <line
                x1={oppX}
                y1={oppY}
                x2={posX}
                y2={posY}
                stroke="#f59e0b"
                strokeWidth="0.8"
                strokeDasharray="1.5 1"
              />
              <text x={posX} y={posY - 5} fill="#ffffff" fontSize="2.2" fontWeight="bold" textAnchor="middle">
                {telemetry.proximityMeters !== undefined ? `Δ ${telemetry.proximityMeters}m Proximity` : 'Penalty Zone'}
              </text>
            </g>
          )}

          {/* 2. RED CARD: Impact angle, studs exposure, velocity vector */}
          {category === 'RED_CARD' && showVectors && (
            <g>
              <line
                x1={posX + 4}
                y1={posY + 3}
                x2={posX}
                y2={posY}
                stroke="#ef4444"
                strokeWidth="1.0"
              />
              <circle
                cx={posX}
                cy={posY}
                r="4.2"
                stroke="#ef4444"
                strokeWidth="0.7"
                fill="#ef4444"
                fillOpacity="0.22"
              />
              <text x={posX} y={posY - 5.5} fill="#fca5a5" fontSize="2.2" fontWeight="bold" textAnchor="middle">
                {telemetry.speedKmh ? `${telemetry.speedKmh} km/h • ${telemetry.forceLevel || 'Challenge'}` : 'High Impact Challenge'}
              </text>
            </g>
          )}

          {/* 3. GOAL REVIEW & GLT: Hawk-Eye Goal-Line Triangulation */}
          {category === 'GOAL_REVIEW' && (
            <g>
              <line
                x1={posX < 50 ? 2 : 98}
                y1="23"
                x2={posX < 50 ? 2 : 98}
                y2="42"
                stroke="#38bdf8"
                strokeWidth="1.2"
              />
              <rect
                x={posX < 50 ? 1.8 : 95.8}
                y="26"
                width="2.4"
                height="13"
                fill="#38bdf8"
                fillOpacity="0.25"
                stroke="#38bdf8"
                strokeWidth="0.4"
                strokeDasharray="1 1"
              />
              <circle
                cx={posX}
                cy={posY}
                r="1.8"
                stroke="#ffffff"
                strokeWidth="0.6"
                fill="#fbbf24"
                fillOpacity="0.9"
              />
              <text x={posX} y={posY - 3.5} fill="#ffffff" fontSize="2.2" fontWeight="bold" textAnchor="middle">
                {telemetry.marginCm ? `GLT: ${telemetry.marginCm}mm On Line` : 'Goal Line Triangulation'}
              </text>
            </g>
          )}

          {/* 4. HANDBALL: Proximity Circle, Deflection Angle & Arm Silhouette */}
          {category === 'HANDBALL' && showVectors && (
            <g>
              <path
                d={`M ${posX - 3} ${posY - 4} L ${posX} ${posY} L ${posX + 1.5} ${posY - 1}`}
                stroke="#4ade80"
                strokeWidth="0.8"
                fill="none"
              />
              <circle
                cx={posX}
                cy={posY}
                r="4.8"
                stroke="#c084fc"
                strokeWidth="0.7"
                strokeDasharray="1.2 0.8"
                fill="#c084fc"
                fillOpacity="0.18"
              />
              <text x={posX} y={posY - 6} fill="#e9d5ff" fontSize="2.2" fontWeight="bold" textAnchor="middle">
                {telemetry.proximityMeters ? `${telemetry.proximityMeters}m Proximity (Deflection: ${telemetry.deflectedFrom || 'Thigh'})` : 'Natural Silhouette'}
              </text>
            </g>
          )}

          {/* 5. OFFSIDE: Semi-Automated Offside Technology (SAOT) 3D Virtual Line */}
          {category === 'OFFSIDE' && (
            <g>
              <line
                x1={posX - 1.2}
                y1="2"
                x2={posX - 1.2}
                y2="63"
                stroke="#38bdf8"
                strokeWidth="0.7"
                strokeDasharray="1.5 1"
              />
              <line
                x1={posX}
                y1="2"
                x2={posX}
                y2="63"
                stroke="#ef4444"
                strokeWidth="0.8"
              />
              <rect
                x={posX - 1.2}
                y="10"
                width="1.2"
                height="45"
                fill="#ef4444"
                fillOpacity="0.3"
              />
              <text x={posX} y="7" fill="#ffffff" fontSize="2.2" fontWeight="bold" textAnchor="middle">
                {telemetry.marginCm ? `SAOT Margin: ${telemetry.marginCm}cm` : 'SAOT 3D Calibrated Plane'}
              </text>
            </g>
          )}
        </svg>

        {/* INTERACTIVE PITCH PINS */}

        {/* Key Involved Player Pin */}
        <button
          onClick={() => setActivePin(activePin === 'key' ? null : 'key')}
          style={{ left: `${posX}%`, top: `${posY}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group focus:outline-none"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-6 h-6 rounded-full bg-[#38003c] border-2 border-white shadow-lg flex items-center justify-center text-[10px] font-black text-white hover:scale-110 transition-transform">
              {keyPlayer.slice(0, 2).toUpperCase()}
            </span>
            <span className="absolute -inset-1 rounded-full border border-purple-300 animate-ping opacity-60" />
          </div>

          {/* Player Badge Tooltip */}
          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 ${activePin === 'key' ? 'flex' : 'hidden group-hover:flex'} flex-col items-center bg-slate-900 text-white px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap text-xs pointer-events-none z-30 border border-slate-700`}>
            <span className="font-bold text-white">{keyPlayer}</span>
            <span className="text-[10px] text-slate-300 font-mono">
              X: {coordinates.x}m • Y: {coordinates.y}m
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold">
              Team: {team}
            </span>
          </div>
        </button>

        {/* Opponent Player Pin (if applicable) */}
        {opponentPlayer && showOpponents && (
          <button
            onClick={() => setActivePin(activePin === 'opponent' ? null : 'opponent')}
            style={{ left: `${oppX}%`, top: `${oppY}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group focus:outline-none"
          >
            <div className="w-5 h-5 rounded-full bg-sky-600 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow hover:scale-110 transition-transform">
              {opponentPlayer.slice(0, 2).toUpperCase()}
            </div>

            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 ${activePin === 'opponent' ? 'flex' : 'hidden group-hover:flex'} flex-col items-center bg-slate-900 px-2.5 py-1 rounded-md text-white text-[10px] whitespace-nowrap pointer-events-none z-30 shadow border border-slate-700`}>
              <span className="font-bold">{opponentPlayer}</span>
              <span className="text-[9px] text-sky-300">Opponent Involved</span>
            </div>
          </button>
        )}
      </div>

      {/* Dynamic Incident Jumper Toolbar (Allows User to Click Incidents Straight on the Pitch) */}
      {availableIncidents.length > 0 && onSelectIncident && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center justify-between gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Layers className="w-3 h-3 text-purple-900" />
            Switch Incident On Pitch:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {availableIncidents.map(inc => (
              <button
                key={inc.incidentId}
                onClick={() => onSelectIncident(inc.incidentId)}
                className={`px-2 py-1 rounded text-[11px] font-bold transition border cursor-pointer ${
                  inc.incidentId === incidentId
                    ? 'bg-purple-900 text-white border-purple-900 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {inc.minute}&apos; {inc.category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Spatial Telemetry Data Grid */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">Pitch Sector</span>
          <span className="font-bold text-slate-800 truncate block" title={sectorLabel}>
            {sectorLabel}
          </span>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">Spatial Metric</span>
          <span className="font-bold text-purple-900 font-mono truncate block">
            {category === 'OFFSIDE' && telemetry.marginCm ? `SAOT Margin: ${telemetry.marginCm}cm` : ''}
            {category === 'HANDBALL' && telemetry.proximityMeters ? `Distance: ${telemetry.proximityMeters}m` : ''}
            {category === 'GOAL_REVIEW' && telemetry.marginCm ? `GLT: ${telemetry.marginCm}mm On Line` : ''}
            {category === 'PENALTY' && telemetry.proximityMeters !== undefined ? `Distance: ${telemetry.proximityMeters}m (No Contact)` : ''}
            {category === 'RED_CARD' && telemetry.speedKmh ? `${telemetry.speedKmh} km/h tackle speed` : ''}
          </span>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">Tracking Standard</span>
          <span className="font-bold text-emerald-700 font-mono truncate block">
            Hawk-Eye 3D (120 fps)
          </span>
        </div>
      </div>
    </div>
  );
}
