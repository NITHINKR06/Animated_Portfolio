/**
 * @module VandeBharatBuilder
 * @description Procedural 3D model builder for the Indian Railways Vande Bharat Express.
 * Builds authentic aerodynamic driving cab (locomotive) and 4 connected passenger carriages
 * with iconic pearl-white body, deep navy-blue aerodynamic band, tinted panoramic window ribbon,
 * realistic bogies, steel wheels, inter-coach bellows, and headlights.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import * as THREE from 'three';

export interface TrainsetAssembly {
  root: THREE.Group;
  locomotive: THREE.Group;
  coaches: THREE.Group[];
  wheels: THREE.Mesh[];
  headlights: THREE.Light[];
  glowSprites: THREE.Mesh[];
  coachLength: number;
  gapLength: number;
}

export function createVandeBharatTrainset(): TrainsetAssembly {
  const root = new THREE.Group();
  const wheels: THREE.Mesh[] = [];
  const headlights: THREE.Light[] = [];
  const glowSprites: THREE.Mesh[] = [];

  // ── Palette Materials ──────────────────────────────────────────
  const whiteBodyMat = new THREE.MeshStandardMaterial({
    color: 0xf2f4f8,
    roughness: 0.28,
    metalness: 0.18,
  });

  const navyBlueMat = new THREE.MeshStandardMaterial({
    color: 0x0c2044, // Iconic Vande Bharat deep navy blue
    roughness: 0.32,
    metalness: 0.35,
  });

  const darkWindowMat = new THREE.MeshStandardMaterial({
    color: 0x070b12,
    roughness: 0.08,
    metalness: 0.9,
  });

  const undercarriageMat = new THREE.MeshStandardMaterial({
    color: 0x141820,
    roughness: 0.65,
    metalness: 0.55,
  });

  const wheelSteelMat = new THREE.MeshStandardMaterial({
    color: 0x5a6578,
    roughness: 0.22,
    metalness: 0.88,
  });

  const champagneAccentMat = new THREE.MeshStandardMaterial({
    color: 0xd6b99a,
    roughness: 0.35,
    metalness: 0.5,
  });

  const burgundyAccentMat = new THREE.MeshStandardMaterial({
    color: 0x873653,
    roughness: 0.35,
    metalness: 0.45,
  });

  const bellowsRubberMat = new THREE.MeshStandardMaterial({
    color: 0x111318,
    roughness: 0.85,
    metalness: 0.1,
  });

  const headlightEmissiveMat = new THREE.MeshBasicMaterial({
    color: 0xfffaed,
  });

  // ── Helper: Bogie Generator ───────────────────────────────────
  const createBogie = (xOffset: number, zOffset: number): THREE.Group => {
    const bogieGroup = new THREE.Group();
    bogieGroup.position.set(xOffset, 0.4, zOffset);

    // Bogie Frame
    const frameGeo = new THREE.BoxGeometry(2.3, 0.25, 3.2);
    const frameMesh = new THREE.Mesh(frameGeo, undercarriageMat);
    bogieGroup.add(frameMesh);

    // 2 Axles, 4 Wheels
    const axleGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.4, 12);
    axleGeo.rotateZ(Math.PI / 2);
    const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.18, 20);
    wheelGeo.rotateZ(Math.PI / 2);

    [-1.0, 1.0].forEach((axleZ) => {
      const axle = new THREE.Mesh(axleGeo, wheelSteelMat);
      axle.position.set(0, 0, axleZ);
      bogieGroup.add(axle);

      [-1.18, 1.18].forEach((wheelX) => {
        const wheel = new THREE.Mesh(wheelGeo, wheelSteelMat);
        wheel.position.set(wheelX, 0, axleZ);
        bogieGroup.add(wheel);
        wheels.push(wheel);
      });
    });

    return bogieGroup;
  };

  // ── Helper: Inter-Coach Gangway Bellows ────────────────────────
  const createGangwayBellows = (zPos: number): THREE.Group => {
    const bellowsGroup = new THREE.Group();
    bellowsGroup.position.set(0, 1.6, zPos);

    // Flexible pleated rubber bellows
    for (let i = 0; i < 5; i++) {
      const ringGeo = new THREE.BoxGeometry(2.3, 2.5, 0.16);
      const ringMesh = new THREE.Mesh(ringGeo, bellowsRubberMat);
      ringMesh.position.set(0, 0, (i - 2) * 0.2);
      bellowsGroup.add(ringMesh);
    }
    return bellowsGroup;
  };

  // ── 1. LOCOMOTIVE / DRIVING CAB (Aerodynamic Vande Bharat Nose) ─
  const locomotive = new THREE.Group();
  const locoLength = 12.0;
  const width = 2.8;
  const height = 2.9;

  // Main Cab Body
  const locoBodyGeo = new THREE.BoxGeometry(width, height, locoLength - 3.5);
  const locoBody = new THREE.Mesh(locoBodyGeo, whiteBodyMat);
  locoBody.position.set(0, height / 2 + 0.5, -(locoLength - 3.5) / 2 + 1.0);
  locomotive.add(locoBody);

  // Aerodynamic Sloped Nose Cone
  const noseShape = new THREE.Shape();
  noseShape.moveTo(-width / 2, 0);
  noseShape.lineTo(width / 2, 0);
  noseShape.lineTo(width / 2 - 0.25, 2.2);
  noseShape.lineTo(-width / 2 + 0.25, 2.2);
  noseShape.closePath();

  // Procedural Wedge Nose
  const noseGroup = new THREE.Group();
  noseGroup.position.set(0, 0.5, 3.8);

  // Aerodynamic nose curve: top hood
  const noseConeGeo = new THREE.BoxGeometry(width - 0.1, 1.8, 3.2);
  const noseCone = new THREE.Mesh(noseConeGeo, whiteBodyMat);
  noseCone.position.set(0, 0.9, 0);
  noseCone.rotation.x = -0.32; // Rake angle
  noseGroup.add(noseCone);

  // Navy Blue Front Chevron Band
  const navyChevronGeo = new THREE.BoxGeometry(width + 0.04, 0.75, 3.0);
  const navyChevron = new THREE.Mesh(navyChevronGeo, navyBlueMat);
  navyChevron.position.set(0, 1.05, 0.1);
  navyChevron.rotation.x = -0.32;
  noseGroup.add(navyChevron);

  // Slanted Dark Front Windshield
  const windshieldGeo = new THREE.BoxGeometry(width - 0.35, 0.95, 1.6);
  const windshield = new THREE.Mesh(windshieldGeo, darkWindowMat);
  windshield.position.set(0, 1.8, -0.6);
  windshield.rotation.x = -0.42;
  noseGroup.add(windshield);

  // Aerodynamic Cowcatcher / Skirt
  const cowcatcherGeo = new THREE.BoxGeometry(width, 0.45, 1.8);
  const cowcatcher = new THREE.Mesh(cowcatcherGeo, undercarriageMat);
  cowcatcher.position.set(0, 0.22, 1.2);
  cowcatcher.rotation.x = 0.25;
  noseGroup.add(cowcatcher);

  // Twin High-Intensity LED Headlights
  [-0.85, 0.85].forEach((hx) => {
    const lightHousing = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.22, 0.15),
      undercarriageMat
    );
    lightHousing.position.set(hx, 0.9, 1.65);
    noseGroup.add(lightHousing);

    const lightBulb = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.08, 12),
      headlightEmissiveMat
    );
    lightBulb.rotation.x = Math.PI / 2;
    lightBulb.position.set(hx, 0.9, 1.72);
    noseGroup.add(lightBulb);

    // Forward Spotlight beam
    const spot = new THREE.SpotLight(0xfffaed, 3.5, 35, Math.PI / 6, 0.3, 1.2);
    spot.position.set(hx, 1.4, 5.0);
    spot.target.position.set(hx, 0.2, 35.0);
    locomotive.add(spot);
    locomotive.add(spot.target);
    headlights.push(spot);
  });

  locomotive.add(noseGroup);

  // Side Navy Blue Windows Band on Locomotive
  const locoWindowBandGeo = new THREE.BoxGeometry(width + 0.05, 0.9, locoLength - 4.5);
  const locoWindowBand = new THREE.Mesh(locoWindowBandGeo, navyBlueMat);
  locoWindowBand.position.set(0, height / 2 + 0.6, -(locoLength - 4.5) / 2 + 0.8);
  locomotive.add(locoWindowBand);

  // Panoramic Dark Glass Strips
  [-width / 2 - 0.04, width / 2 + 0.04].forEach((gx) => {
    const glassStrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.65, locoLength - 5.2),
      darkWindowMat
    );
    glassStrip.position.set(gx, height / 2 + 0.6, -(locoLength - 5.2) / 2 + 0.6);
    locomotive.add(glassStrip);
  });

  // Sleek Aerodynamic Roof fairing
  const locoRoofGeo = new THREE.CylinderGeometry(width / 2, width / 2, locoLength - 3.5, 16);
  locoRoofGeo.rotateX(Math.PI / 2);
  const locoRoof = new THREE.Mesh(locoRoofGeo, whiteBodyMat);
  locoRoof.scale.set(1.0, 0.22, 1.0);
  locoRoof.position.set(0, height + 0.5, -(locoLength - 3.5) / 2 + 1.0);
  locomotive.add(locoRoof);

  // Bogies on locomotive
  locomotive.add(createBogie(0, 1.0));
  locomotive.add(createBogie(0, -(locoLength - 5.5)));

  root.add(locomotive);

  // ── 2. PASSENGER CARRIAGES (4 Project Coaches) ─────────────────
  const coachLength = 13.5;
  const gapLength = 1.0;
  const coaches: THREE.Group[] = [];

  const coachTitles = [
    'COACH 01 // DRIFTGUARD',
    'COACH 02 // HAQMS',
    'COACH 03 // WALRUS',
    'COACH 04 // CHC SECURE',
  ];

  const coachEmissiveColors = [
    0x873653, // DriftGuard Burgundy
    0xd6b99a, // HAQMS Champagne
    0x873653, // WALRUS Burgundy
    0xd6b99a, // CHC Secure Champagne
  ];

  for (let c = 0; c < 4; c++) {
    const coach = new THREE.Group();
    // Position each carriage strictly behind the previous one
    const zOffset = -(locoLength - 1.5) - c * (coachLength + gapLength) - coachLength / 2;
    coach.position.set(0, 0, zOffset);

    // Main Carriage Body (Pearl White)
    const bodyGeo = new THREE.BoxGeometry(width, height, coachLength);
    const bodyMesh = new THREE.Mesh(bodyGeo, whiteBodyMat);
    bodyMesh.position.set(0, height / 2 + 0.5, 0);
    coach.add(bodyMesh);

    // Continuous Deep Navy Blue Window Ribbon
    const navyRibbonGeo = new THREE.BoxGeometry(width + 0.05, 1.0, coachLength);
    const navyRibbon = new THREE.Mesh(navyRibbonGeo, navyBlueMat);
    navyRibbon.position.set(0, height / 2 + 0.65, 0);
    coach.add(navyRibbon);

    // Dark Panoramic Tinted Glass on Both Sides
    [-width / 2 - 0.04, width / 2 + 0.04].forEach((gx) => {
      const glass = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.72, coachLength - 0.8),
        darkWindowMat
      );
      glass.position.set(gx, height / 2 + 0.65, 0);
      coach.add(glass);

      // Subtle Champagne Accent Pin-stripes above/below windows
      const stripeTop = new THREE.Mesh(
        new THREE.BoxGeometry(0.045, 0.06, coachLength),
        champagneAccentMat
      );
      stripeTop.position.set(gx, height / 2 + 1.18, 0);
      coach.add(stripeTop);

      const stripeBottom = new THREE.Mesh(
        new THREE.BoxGeometry(0.045, 0.06, coachLength),
        champagneAccentMat
      );
      stripeBottom.position.set(gx, height / 2 + 0.12, 0);
      coach.add(stripeBottom);
    });

    // Aerodynamic Curved Roof with AC Pods
    const roofGeo = new THREE.CylinderGeometry(width / 2, width / 2, coachLength, 16);
    roofGeo.rotateX(Math.PI / 2);
    const roof = new THREE.Mesh(roofGeo, whiteBodyMat);
    roof.scale.set(1.0, 0.22, 1.0);
    roof.position.set(0, height + 0.5, 0);
    coach.add(roof);

    // AC Unit Enclosures on Roof
    [-3.0, 3.0].forEach((acZ) => {
      const acGeo = new THREE.BoxGeometry(1.6, 0.28, 2.4);
      const acMesh = new THREE.Mesh(acGeo, undercarriageMat);
      acMesh.position.set(0, height + 0.78, acZ);
      coach.add(acMesh);
    });

    // Interior Holographic Project Beacon (Shining through tinted glass)
    const beaconColor = coachEmissiveColors[c];
    const beaconGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.8, 16);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: beaconColor,
      emissive: beaconColor,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2,
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, height / 2 + 0.6, 0);
    coach.add(beacon);

    // Undercarriage Skirt & Equipment Bays
    const underGeo = new THREE.BoxGeometry(width - 0.3, 0.45, coachLength - 4.5);
    const underMesh = new THREE.Mesh(underGeo, undercarriageMat);
    underMesh.position.set(0, 0.45, 0);
    coach.add(underMesh);

    // Dual Bogies (Front and Rear of Coach)
    coach.add(createBogie(0, coachLength / 2 - 2.5));
    coach.add(createBogie(0, -coachLength / 2 + 2.5));

    // Gangway Bellows connecting to previous vehicle
    const bellowZ = coachLength / 2 + gapLength / 2;
    coach.add(createGangwayBellows(bellowZ));

    coaches.push(coach);
    root.add(coach);
  }

  return {
    root,
    locomotive,
    coaches,
    wheels,
    headlights,
    glowSprites,
    coachLength,
    gapLength,
  };
}

// ── Railway Track & Infrastructure Generator ─────────────────────
export interface RailwayInfrastructure {
  trackGroup: THREE.Group;
  signalLights: THREE.PointLight[];
}

export function createRailwayInfrastructure(): RailwayInfrastructure {
  const trackGroup = new THREE.Group();
  const signalLights: THREE.PointLight[] = [];

  const railSteelMat = new THREE.MeshStandardMaterial({
    color: 0x873653,
    roughness: 0.2,
    metalness: 0.95,
  });

  const sleeperConcreteMat = new THREE.MeshStandardMaterial({
    color: 0x22262e,
    roughness: 0.85,
    metalness: 0.1,
  });

  const ballastGravelMat = new THREE.MeshStandardMaterial({
    color: 0x0a0c10,
    roughness: 0.95,
    metalness: 0.05,
  });

  const catenarySteelMat = new THREE.MeshStandardMaterial({
    color: 0x3a4250,
    roughness: 0.4,
    metalness: 0.8,
  });

  // Track Length: Extends from +40 to -240
  const trackZStart = 40;
  const trackZEnd = -240;
  const totalLength = trackZStart - trackZEnd;

  // Ballast Bed (Gravel Mound)
  const ballastGeo = new THREE.BoxGeometry(5.2, 0.3, totalLength);
  const ballast = new THREE.Mesh(ballastGeo, ballastGravelMat);
  ballast.position.set(0, -0.15, (trackZStart + trackZEnd) / 2);
  trackGroup.add(ballast);

  // Parallel Steel Rails
  const railGauge = 2.36; // Gauge width for Vande Bharat bogies
  [-railGauge / 2, railGauge / 2].forEach((rx) => {
    const railGeo = new THREE.BoxGeometry(0.12, 0.18, totalLength);
    const rail = new THREE.Mesh(railGeo, railSteelMat);
    rail.position.set(rx, 0.06, (trackZStart + trackZEnd) / 2);
    trackGroup.add(rail);
  });

  // Concrete Sleepers (Ties) spaced every 1.2 units
  const sleeperGeo = new THREE.BoxGeometry(3.6, 0.18, 0.38);
  for (let z = trackZStart; z >= trackZEnd; z -= 1.2) {
    const sleeper = new THREE.Mesh(sleeperGeo, sleeperConcreteMat);
    sleeper.position.set(0, -0.02, z);
    trackGroup.add(sleeper);
  }

  // Catenary Masts & Overhead Electric Gantry every 28 units
  for (let z = trackZStart; z >= trackZEnd; z -= 28) {
    const gantry = new THREE.Group();
    gantry.position.set(0, 0, z);

    // Left & Right Masts
    [-3.2, 3.2].forEach((mx) => {
      const mastGeo = new THREE.CylinderGeometry(0.1, 0.1, 7.5, 8);
      const mast = new THREE.Mesh(mastGeo, catenarySteelMat);
      mast.position.set(mx, 3.75, 0);
      gantry.add(mast);
    });

    // Crossbeam
    const beamGeo = new THREE.BoxGeometry(6.6, 0.16, 0.16);
    const beam = new THREE.Mesh(beamGeo, catenarySteelMat);
    beam.position.set(0, 7.2, 0);
    gantry.add(beam);

    // Railway Signal Light (Burgundy & Champagne)
    const signalHousing = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.6, 0.2),
      catenarySteelMat
    );
    signalHousing.position.set(-2.8, 5.5, 0);
    gantry.add(signalHousing);

    const signalLight = new THREE.PointLight(0x873653, 1.2, 15, 1.8);
    signalLight.position.set(-2.8, 5.5, 0.25);
    gantry.add(signalLight);
    signalLights.push(signalLight);

    trackGroup.add(gantry);
  }

  // Overhead Catenary Contact Wire running continuously
  const wireGeo = new THREE.CylinderGeometry(0.015, 0.015, totalLength, 4);
  wireGeo.rotateX(Math.PI / 2);
  const wire = new THREE.Mesh(wireGeo, catenarySteelMat);
  wire.position.set(0, 6.2, (trackZStart + trackZEnd) / 2);
  trackGroup.add(wire);

  return {
    trackGroup,
    signalLights,
  };
}
