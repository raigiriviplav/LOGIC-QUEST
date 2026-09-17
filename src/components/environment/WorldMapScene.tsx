import React, { useState, useRef, useEffect, useCallback } from 'react';
import { World, PlayerProgress } from '../../types/game';
import { sounds } from '../../utils/audio';
import { WorldMarker } from '../common/WorldMarker';
import { FantasyButton } from '../common/FantasyButton';
import { Play, Compass, ArrowLeft, Coins, Award, Eye, Hand, Lock } from 'lucide-react';
import fantasyMapUrl from '../../assets/images/fantasy_world_map_1789667486252.jpg';

interface WorldMapSceneProps {
  worlds: World[];
  progress?: PlayerProgress;
  onSelectWorld: (world: World) => void;
  onBackToMenu: () => void;
}

export const WorldMapScene: React.FC<WorldMapSceneProps> = ({
  worlds,
  progress,
  onSelectWorld,
  onBackToMenu,
}) => {
  const [inspectedWorld, setInspectedWorld] = useState<World | null>(worlds[0]);
  const [notification, setNotification] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Map scrolling / panning container refs and state
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number }>({
    x: 0,
    y: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  // Center camera on World 1 (the southwest forest valley) upon mounting
  const centerOnHero = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    // World 1 is approximately at 17% X, 72% Y of the 2200x1375 map canvas
    const targetX = 2200 * 0.17 - container.clientWidth / 2;
    const targetY = 1375 * 0.72 - container.clientHeight / 2;

    container.scrollTo({
      left: Math.max(0, targetX),
      top: Math.max(0, targetY),
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    // Initial centering delay to let dimensions stabilize
    const timer = setTimeout(() => {
      centerOnHero();
    }, 150);
    return () => clearTimeout(timer);
  }, [centerOnHero]);

  // Mouse drag-to-pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasInteracted(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
    containerRef.current.scrollTop = dragStartRef.current.scrollTop - dy;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag-to-pan handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length === 0) return;
    setIsDragging(true);
    setHasInteracted(true);
    dragStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || e.touches.length === 0) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
    containerRef.current.scrollTop = dragStartRef.current.scrollTop - dy;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Marker click handler
  const handleMarkerClick = (world: World) => {
    setInspectedWorld(world);
    if (world.status === 'unlocked') {
      sounds.playRuneSelect();
    } else if (world.status === 'locked') {
      sounds.playWrong();
      setNotification(`World ${world.number}: ${world.title} is locked by the Mountain Fortress Gate! Complete World 1 first.`);
      setTimeout(() => setNotification(null), 3500);
    } else {
      sounds.playWrong();
      setNotification(`World ${world.number} is shrouded in dense uncharted mist!`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  const handleEnterWorld = (world: World) => {
    if (world.status === 'unlocked') {
      sounds.playClick();
      onSelectWorld(world);
    } else {
      sounds.playWrong();
    }
  };

  // Coordinates of the 10 Physical Regions across the 2200x1375 map canvas (Percentages)
  const nodePositions: { [id: number]: { x: number; y: number } } = {
    1: { x: 17, y: 73 }, // World 1: Understand Python (Peaceful Forest Valley & Beginner Village)
    2: { x: 31, y: 61 }, // World 2: Make Decisions (Gorged Mountain Pass & Fortress Gate)
    3: { x: 23, y: 36 }, // World 3: Repeat Logic (Dense Jungle & Stepped Waterfalls)
    4: { x: 45, y: 48 }, // World 4: Combine Everything (Central Crossroads & River Bridges)
    5: { x: 64, y: 39 }, // World 5: Organize Logic (Fortified City & Clockwork Spire)
    6: { x: 80, y: 30 }, // World 6: Model Things (Ancient Castle Kingdom & Farmlands)
    7: { x: 84, y: 64 }, // World 7: Manage Information (Archipelago Trading Ports & Galleons)
    8: { x: 66, y: 76 }, // World 8: Find Problems (Corrupted Wasteland & Void Crystals)
    9: { x: 48, y: 83 }, // World 9: AI-Generated Code (Celestial Astrolabe & Floating Monoliths)
    10: { x: 49, y: 19 }, // World 10: Mastery (The Titan Peak & Ancient Sky Citadel)
  };

  // Calculate completed subtopics for World 1
  const completedCount = progress?.completedSubtopics
    ? Object.keys(progress.completedSubtopics).length
    : 0;

  return (
    <div
      id="world-map-scene"
      className="relative w-full h-full select-none overflow-hidden bg-[#1b1007]"
    >
      {/* =========================================================================
          1. LARGE ILLUSTRATED ADVENTURE OVERWORLD MAP (Camera Viewport)
          Pannable, high-resolution canvas occupying 90% of screen.
          ========================================================================= */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`w-full h-full overflow-auto scrollbar-none select-none relative ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Large Canvas Size: 2200px x 1375px (16:10 ratio) */}
        <div className="relative w-[2200px] h-[1375px] shrink-0">
          {/* Base Hand-Painted Fantasy Map Art Asset */}
          <img
            src={fantasyMapUrl}
            alt="Hand-painted 2D fantasy adventure overworld map"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-[0.98] contrast-[1.04]"
          />

          {/* =========================================================================
              2. SVG CONNECTED ADVENTURE ROAD & ENVIRONMENTAL LIVING DETAILS
              ========================================================================= */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 2200 1375"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Dirt Road Fill Gradient */}
              <linearGradient id="roadDirtGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8d5b2d" />
                <stop offset="50%" stopColor="#baa070" />
                <stop offset="100%" stopColor="#7a481c" />
              </linearGradient>

              {/* Glowing Quest Trail Dashed Stroke */}
              <linearGradient id="activeTrailGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              {/* Water Shimmer Gradient */}
              <linearGradient id="waterShimmerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* --- ADVENTURE ROAD PATHS CONNECTING THE 10 PHYSICAL REGIONS --- */}
            {/* Winding dirt track from World 1 -> World 2 */}
            <path
              d="M 374 1004 Q 480 940 560 910 Q 640 880 682 838"
              stroke="#593214"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 374 1004 Q 480 940 560 910 Q 640 880 682 838"
              stroke="url(#roadDirtGrad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Active Gold Dash Trail between World 1 and World 2 */}
            <path
              d="M 374 1004 Q 480 940 560 910 Q 640 880 682 838"
              stroke="url(#activeTrailGrad)"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="8 6"
              className="animate-[dash_20s_linear_infinite]"
            />

            {/* Winding Path: World 2 -> World 3 (Cliffs to Jungle Waterfalls) */}
            <path
              d="M 682 838 Q 620 710 540 620 Q 500 550 506 495"
              stroke="#593214"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 682 838 Q 620 710 540 620 Q 500 550 506 495"
              stroke="url(#roadDirtGrad)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="6 6"
              opacity="0.8"
            />

            {/* Path: World 3 -> World 4 (Jungle to Central Valley Crossroads) */}
            <path
              d="M 506 495 Q 680 480 820 560 Q 920 620 990 660"
              stroke="#593214"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 506 495 Q 680 480 820 560 Q 920 620 990 660"
              stroke="url(#roadDirtGrad)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="6 6"
              opacity="0.75"
            />

            {/* Path: World 4 -> World 5 (Central Valley to Fortified City) */}
            <path
              d="M 990 660 Q 1150 630 1280 580 Q 1360 550 1408 536"
              stroke="#593214"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 990 660 Q 1150 630 1280 580 Q 1360 550 1408 536"
              stroke="url(#roadDirtGrad)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="6 6"
              opacity="0.75"
            />

            {/* Path: World 5 -> World 6 (City to Castle Kingdom) */}
            <path
              d="M 1408 536 Q 1550 480 1660 440 Q 1720 420 1760 412"
              stroke="#593214"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 1408 536 Q 1550 480 1660 440 Q 1720 420 1760 412"
              stroke="url(#roadDirtGrad)"
              strokeWidth="5"
              fill="none"
              strokeDasharray="6 6"
              opacity="0.7"
            />

            {/* Path: World 6 -> World 7 (Castle to Coastal Trading Port) */}
            <path
              d="M 1760 412 Q 1860 530 1880 680 Q 1870 790 1848 880"
              stroke="#593214"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 1760 412 Q 1860 530 1880 680 Q 1870 790 1848 880"
              stroke="url(#roadDirtGrad)"
              strokeWidth="5"
              fill="none"
              strokeDasharray="6 6"
              opacity="0.7"
            />

            {/* Path: World 7 -> World 8 (Port across bay to Corrupted Wasteland) */}
            <path
              d="M 1848 880 Q 1720 980 1580 1020 Q 1490 1040 1452 1045"
              stroke="#593214"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 1848 880 Q 1720 980 1580 1020 Q 1490 1040 1452 1045"
              stroke="url(#roadDirtGrad)"
              strokeWidth="5"
              fill="none"
              strokeDasharray="6 6"
              opacity="0.7"
            />

            {/* Path: World 8 -> World 9 (Wasteland to Mountain Observatory) */}
            <path
              d="M 1452 1045 Q 1320 1100 1180 1120 Q 1100 1135 1056 1141"
              stroke="#593214"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 1452 1045 Q 1320 1100 1180 1120 Q 1100 1135 1056 1141"
              stroke="url(#roadDirtGrad)"
              strokeWidth="5"
              fill="none"
              strokeDasharray="6 6"
              opacity="0.65"
            />

            {/* Path: World 9 -> World 10 (Observatory winding up to Titan Peak) */}
            <path
              d="M 1056 1141 Q 1020 920 1060 620 Q 1070 420 1078 261"
              stroke="#593214"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 1056 1141 Q 1020 920 1060 620 Q 1070 420 1078 261"
              stroke="url(#roadDirtGrad)"
              strokeWidth="5"
              fill="none"
              strokeDasharray="6 6"
              opacity="0.6"
            />

            {/* --- LIVING DETAILS: Animated Soaring Eagles & Birds --- */}
            <g className="animate-pulse" opacity="0.8">
              {/* Soaring Eagle near central peaks */}
              <path d="M 850 480 Q 865 470 880 480 Q 895 470 910 480 Q 880 485 850 480 Z" fill="#1c1917" />
              <path d="M 880 478 L 880 492" stroke="#1c1917" strokeWidth="2" />

              {/* Smaller birds over valley */}
              <path d="M 980 430 Q 990 422 1000 430 Q 1010 422 1020 430 Q 1000 433 980 430 Z" fill="#292524" />
              <path d="M 1420 320 Q 1430 312 1440 320 Q 1450 312 1460 320 Q 1440 323 1420 320 Z" fill="#292524" />
            </g>

            {/* --- LIVING DETAILS: Gently Bobbing Sailboat in Azure Bay --- */}
            <g transform="translate(1930, 750)">
              {/* Ship Hull */}
              <path d="M 0 15 Q 18 20 36 15 L 34 8 L 4 8 Z" fill="#5c2f0f" stroke="#291507" strokeWidth="1.2" />
              {/* Mast & White Canvas Sail */}
              <line x1="18" y1="8" x2="18" y2="-16" stroke="#451a03" strokeWidth="1.5" />
              <path d="M 18 -14 Q 30 -6 18 2 Z" fill="#fef9c3" stroke="#ca8a04" strokeWidth="0.8" />
              {/* Gentle water wake */}
              <ellipse cx="18" cy="18" rx="22" ry="3" fill="#38bdf8" opacity="0.4" />
            </g>
          </svg>

          {/* =========================================================================
              3. ATMOSPHERIC FOG OF WAR (Natural illustrated clouds & mountain haze)
              Veiling Worlds 3 through 10 in mysterious depth
              ========================================================================= */}
          {/* North-East Distant Mountain Clouds */}
          <div
            className="absolute top-0 right-0 w-[1400px] h-[750px] pointer-events-none opacity-45 mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.7) 0%, rgba(240,249,255,0.4) 40%, transparent 75%)',
            }}
          />
          {/* Central Valley Shrouding Mist */}
          <div
            className="absolute top-[280px] left-[700px] w-[900px] h-[550px] pointer-events-none opacity-30 mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(254,249,195,0.5) 0%, rgba(224,242,254,0.2) 50%, transparent 80%)',
            }}
          />
          {/* Titan Peak Holy Cloud Ring */}
          <div
            className="absolute top-[100px] left-[850px] w-[500px] h-[350px] pointer-events-none opacity-40 mix-blend-screen"
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(254,243,199,0.3) 50%, transparent 75%)',
            }}
          />

          {/* =========================================================================
              4. THE 10 PHYSICAL WORLD MARKERS (Architectural Landmarks)
              ========================================================================= */}
          {worlds.map((world) => {
            const pos = nodePositions[world.number] || { x: 50, y: 50 };
            const isPlayerAtWorld1 = world.number === 1;
            const isSelected = inspectedWorld?.id === world.id;

            return (
              <div
                key={world.id}
                style={{
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="z-30"
              >
                <WorldMarker
                  world={world}
                  isSelected={isSelected}
                  isPlayerHere={isPlayerAtWorld1}
                  onClick={handleMarkerClick}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          5. MINIMAL, TACTILE MAP UI (Occupying 10-15% of screen)
          Carved wood, stone, parchment, leaving 85-90% for the world!
          ========================================================================= */}
      {/* Top Bar: In-World Carved Sign & Vital Player Stats */}
      <header className="absolute top-2 sm:top-4 inset-x-2 sm:inset-x-6 z-40 pointer-events-none flex items-start justify-between gap-2">
        {/* Left: Return to Camp Wooden Button */}
        <div className="pointer-events-auto">
          <FantasyButton
            variant="wood"
            size="sm"
            onClick={onBackToMenu}
            icon={<ArrowLeft className="w-4 h-4 text-amber-200" />}
            title="Return to Camp"
            aria-label="Return to Camp"
            className="px-3 py-1.5 text-xs sm:text-sm shadow-xl"
          >
            Camp
          </FantasyButton>
        </div>

        {/* Center: Hand-Carved Hanging Signboard */}
        <div className="pointer-events-auto flex flex-col items-center">
          <div className="relative bg-gradient-to-b from-[#783e15] via-[#54280b] to-[#341604] border-3 border-[#945826] rounded-2xl px-4 sm:px-8 py-1.5 sm:py-2 shadow-[0_10px_25px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,230,170,0.3)] flex flex-col items-center text-center">
            {/* Top Moss Accent */}
            <div className="absolute -top-2 left-6 w-8 h-2 bg-[#65a30d] rounded-t-full border-t border-[#365314] shadow pointer-events-none" />
            <h1 className="font-adventure text-lg sm:text-2xl text-carved-title tracking-wider leading-none">
              THE REALM OF LOGIC
            </h1>
            <p className="font-medieval text-[10px] sm:text-xs text-[#fef08a] italic tracking-wide mt-0.5">
              Your journey to master the logic behind code.
            </p>
          </div>
        </div>

        {/* Right: Currency & Compass Navigation Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Coins Badge */}
          <div className="bg-gradient-to-b from-[#783e15] to-[#452204] border-2 border-[#a16207] px-2.5 py-1 rounded-xl shadow-lg flex items-center gap-1 text-[#fef08a] font-adventure text-xs">
            <Coins className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span>{progress?.coins ?? 120}</span>
          </div>

          {/* Score / XP Badge */}
          <div className="bg-gradient-to-b from-[#783e15] to-[#452204] border-2 border-[#a16207] px-2.5 py-1 rounded-xl shadow-lg flex items-center gap-1 text-[#fef08a] font-adventure text-xs">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>{progress?.score ?? 350}</span>
          </div>

          {/* Quick Focus on Hero Button */}
          <FantasyButton
            variant="stone"
            size="icon"
            onClick={centerOnHero}
            title="Center Camera on Adventurer"
            aria-label="Center Camera on Adventurer"
            className="w-8 h-8 sm:w-9 sm:h-9"
          >
            <Compass className="w-4 h-4 text-amber-300" />
          </FantasyButton>
        </div>
      </header>

      {/* Floating Notification Banner if user clicks locked/fogged region */}
      {notification && (
        <div className="absolute top-16 sm:top-20 inset-x-0 z-50 flex justify-center pointer-events-none px-4 animate-[bounce_0.5s_ease-out]">
          <div className="bg-gradient-to-r from-[#451a03] via-[#78350f] to-[#451a03] text-[#fef08a] border-2 border-[#d97706] px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 max-w-md">
            <Lock className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-medieval text-xs sm:text-sm text-center">
              {notification}
            </span>
          </div>
        </div>
      )}

      {/* Drag Hint (disappears once user interacts) */}
      {!hasInteracted && (
        <div className="absolute top-20 left-4 z-40 pointer-events-none bg-[#1e293b]/90 border border-amber-500/50 text-[#fef08a] px-3 py-1.5 rounded-full text-xs font-adventure flex items-center gap-2 shadow-lg animate-pulse">
          <Hand className="w-3.5 h-3.5 text-amber-300" />
          <span>Click & Drag to explore the Realm</span>
        </div>
      )}

      {/* =========================================================================
          6. SELECTED WORLD PARCHMENT SCROLL (Bottom Overlay, Sleek & Compact)
          ========================================================================= */}
      {inspectedWorld && (
        <div className="absolute bottom-2 sm:bottom-4 inset-x-2 sm:inset-x-0 z-40 flex justify-center pointer-events-none">
          <div className="pointer-events-auto w-full max-w-xl bg-radial from-[#fef8e7] via-[#eedab2] to-[#cbb082] border-3 border-[#8b5a2b] p-3 sm:p-4 rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* World Info & Inscription */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
                <span className="font-adventure text-[10px] sm:text-xs uppercase px-2 py-0.5 rounded-full bg-[#78350f] text-[#fef08a] shadow-xs">
                  World {inspectedWorld.number}
                </span>
                <h3 className="font-adventure text-base sm:text-lg text-[#3b1a03] tracking-wide">
                  {inspectedWorld.title}
                </h3>
              </div>
              <p className="font-medieval text-xs text-[#2a1405] leading-snug line-clamp-2">
                "{inspectedWorld.tagline}"
              </p>

              {/* Progress Count or Status */}
              <div className="mt-1 flex items-center justify-center sm:justify-start gap-3 text-[11px] font-chunky text-[#78350f]">
                {inspectedWorld.status === 'unlocked' ? (
                  <>
                    <span className="text-emerald-800 font-bold">
                      ✓ Active Region
                    </span>
                    <span>
                      Cleared: {completedCount} / 15 Subtopics
                    </span>
                  </>
                ) : inspectedWorld.status === 'locked' ? (
                  <span className="text-amber-800 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Fortress Gate Locked
                  </span>
                ) : (
                  <span className="text-slate-600 italic">
                    Uncharted Frontier (Shrouded in mist)
                  </span>
                )}
              </div>
            </div>

            {/* Action Button: ENTER WORLD (if unlocked) or Locked Status */}
            <div className="shrink-0 w-full sm:w-auto">
              {inspectedWorld.status === 'unlocked' ? (
                <FantasyButton
                  variant="gold"
                  size="md"
                  onClick={() => handleEnterWorld(inspectedWorld)}
                  icon={<Play className="w-4 h-4 fill-current text-amber-950" />}
                  className="w-full sm:w-44 py-2.5 text-xs sm:text-sm"
                >
                  Enter World
                </FantasyButton>
              ) : (
                <div className="bg-[#451a03]/80 border border-[#8b5a2b] text-[#fef08a] px-4 py-2 rounded-xl text-center font-adventure text-xs opacity-90 flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Locked</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
