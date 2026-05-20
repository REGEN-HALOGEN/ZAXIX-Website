export type SystemKey = "pro" | "pre" | "core";

export interface Product {
  title: string;
  imageSrc?: string;
  description: string;
  highlights?: string[];
}

const PRODUCT_IMAGES = {
  pro: {
    rAndDClosing:
      "/Product/ZAxis%20Pro/Filling%20system%20For%20R%26D%20%20F%26D%20%20For%20All%20Injectable%20Devices%20%28PFS%20CARTRIDGEVIALAMPULE%29/Product3.png",
    fullyAutoPfs: "/Product/ZAxis%20Pro/Fully%20automated%20PFS%20%20FILLING%20SYSTEM/product7.png",
    roboticPfs:
      "/Product/ZAxis%20Pro/Robotized%20PFS%20%20cartridge%20filling%20system%20with%20IPC/product11.png",
    plungerLabel:
      "/Product/ZAxis%20Pro/Rotarty%20plunger%20rod%20instertion%20%26%20labelling%20machine%20for%20Pre%20-%20filled%20syringes/product223.png",
    labellingFlush:
      "/Product/ZAxis%20Pro/Labelling%20Machine%20For%20Flush%20Syringes%20%20PFS%20%20cartridges/product599.jpeg",
    flush:
      "/Product/ZAxis%20Pro/Flush%20syringe%20tip%20filling%20%26%20cap%20sealing%20machines/product5.jpeg",
    nasal: "/Product/ZAxis%20Pro/Nasal%20Dropseye%20ear%20drops%20filling%20systems/product8.png",
    vial: "/Product/ZAxis%20Pro/Standard%20Vial%20line/product69.png",
    cartridge: "/Product/ZAxis%20Pro/Both%20Ends%20open%20cartridge%20filling%20system/product6.png",
    rAndDFilling: "/Product/ZAxis%20Pro/R%26D%20Filling%20machines/product9.png",
  },
  pre: {
    isolator: "/Product/ZAxis%20Pre/Positive%20pressure%20isolator%20for%20injectables/product434.png",
    bsc: "/Product/ZAxis%20Pre/Biological%20safety%20cabinets%20%28BSC%29/product112.png",
    git: "/Product/ZAxis%20Pre/Glove%20integrity%20tester%20%28GIT%29/product787.png",
    rtp: "/Product/ZAxis%20Pre/Rapid%20transfer%20ports%20%28RTP%29/product342.png",
  },
  core: {
    tunnels: "/Product/ZAxis%20Core/sterilizing%20%26%20Depyrogenation%20Tunnels/product1.png",
    dualChamberPfs: "/Product/ZAxis%20Core/Dual%20Chamber%20PFS%20Filling%20Machine/newproduct.png",
  },
} as const;

export const DEFAULT_PRODUCT_IMAGE_SRC = PRODUCT_IMAGES.pro.rAndDClosing;

export const SYSTEMS: Record<
  SystemKey,
  {
    key: SystemKey;
    label: string;
    title: string;
    subtitle: string;
    products: Product[];
  }
> = {
  pro: {
    key: "pro",
    label: "Pro",
    title: "Z Axis Pro Systems",
    subtitle: "Advanced Aseptic Fill Finish Systems",
    products: [
      {
        title: "R & D filling & closing machines for PFS, vials, cartridges, bottles",
        imageSrc: PRODUCT_IMAGES.pro.rAndDClosing,
        description: "The unique filling & closing system by Z Axis offers ease & convenience of using one system for all injectable devices like PFS/cartridge/vials up to exhibit batches. The switchover from one device to other is minimal with changeable parts.",
        highlights: [
          "Filling spectrum: 0.2ml to 10ml",
          "Suitable for PFS pre-crimped cartridge/vials",
          "Application: Filling & rubber stoppering",
          "Filling & closing station: 1 no.",
          "Vacuum based/PIPO rubber stoppering process",
          "Throughput: 10-15 devices per min",
          "Synchronized LAF can be offered",
          "Compact footprint for smaller R&D setups",
          "Silent performing system",
        ],
      },
      {
        title: "Basic automatic PFS machines for syringes and cartridges (India & South Asia)",
        imageSrc: PRODUCT_IMAGES.pro.fullyAutoPfs,
        description: "Automated Combo Filling & Closing for nested PFS vials & cartridges. Suitable for EU/PICS Markets with cost-effective automated systems with O RABS for improved containment. Fully Automated Filling & Closing Systems with automated debagging, Tyvek lid and sheet removal, ensuring maximum efficiency and minimum manual intervention.",
        highlights: [
          "Suitable for: Aqueous, Semi-Viscous & Viscous Drugs",
          "Filling Volume Spectrum: 0.1ml to 10ml with change parts",
          "Output: 50-150 syringes per min on 1ml fill volume",
          "Suitable for pre-washed, pre-sterilized nested devices",
          "Automated Tyvek lid & paper removal",
          "Automated de-nesting/re-nesting",
        ],
      },
      {
        title: "Robotic PFS Machines For syringes and cartridges",
        imageSrc: PRODUCT_IMAGES.pro.roboticPfs,
        description: "Robotic Arm Integration: The core of the machine is a clean room robot that performs all key tasks. Automation and precision reduce human error, increase speed, and provide consistent, reproducible processes across production runs. The system operates in a sterile environment (C RABS/ISOLATORS) with cleanroom standards, maintaining aseptic conditions during the filling process.",
        highlights: [
          "In-Line weighing systems with sophisticated load cells",
          "Weighs gross & tare weight of syringes",
          "Rejects faulty syringes automatically",
          "Suitable for: Aqueous, Semi-Viscous & Viscous Drugs",
          "Filling Volume Spectrum: 0.1ml to 10ml with change parts",
          "Output: 50-150 syringes per min on 1ml fill volume",
          "Suitable for pre-washed, pre-sterilized nested devices",
        ],
      },
      {
        title: "Plunger rod insertion & labelling machine for PFS",
        imageSrc: PRODUCT_IMAGES.pro.plungerLabel,
        description: "Z AXIS-PRILAB SERIES: Complete solution for pre-filled syringe finishing operations including automatic de-nesting, plunger rod insertion, fitting/screwing, back stop/finger grip placement, and labelling with batch overprinting and verification.",
        highlights: [
          "Automatic de-nesting of PFS from tub/tray",
          "Automatic plunger rod insertion",
          "Automatic plunger rod fitting/screwing",
          "Automatic back stop/finger grip placement",
          "Automatic PFS labelling with batch overprinting",
          "Verification system included",
          "Rated throughput: Up to 120 syringes/minute",
          "Improved efficiency and speed",
        ],
      },
      {
        title: "Flush syringe filling & tip capping machine (reverse filling)",
        imageSrc: PRODUCT_IMAGES.pro.flush,
        description: "Z AXIS-FLS 100 SERIES: Filling & capping system for all types of flush syringes. The machine is designed to perform filling and sealing of pre-engaged syringes equipped with luer tip caps. Four-part syringe packaging system can be offered (barrel/rubber stopper/tip cap/plunger rod).",
        highlights: [
          "Composite packaging line available",
          "Filling & capping integration",
          "Visual inspection capability",
          "Labelling & flow wrapping system",
          "Suitable for luer tip cap syringes",
          "Four-part syringe packaging option",
        ],
      },
      {
        title: "Labelling machine for flush syringes (PFS & cartridges)",
        imageSrc: PRODUCT_IMAGES.pro.labellingFlush,
        description: "Advanced horizontal labelling system with full-length support that prevents rolling, tipping, or vibration. Ideal for syringes with flange, needle shield, and plunger rod. Features controlled syringe rotation via roller conveyor for uniform wrap-around label application.",
        highlights: [
          "Horizontal product stability with full-length support",
          "Controlled syringe rotation via roller conveyor",
          "Wrinkle-free & precise label placement",
          "Eliminates label skew, overlap, and air bubbles",
          "Clear readability of barcode, UDI, and batch info",
          "Non-clamping, gentle handling",
          "Output: 80-300 syringes/min (format dependent)",
          "Compatible with glass & plastic PFS, flush syringes, and cartridges",
          "GMP & regulatory compliance (Annex 1, 21 CFR Part 11)",
        ],
      },
      {
        title: "Nasal drops / eye-ear drops filling machine",
        imageSrc: PRODUCT_IMAGES.pro.nasal,
        description: "Z AXIS NDEED COMBO 100: Monoblock design with entire system (infeed, filling, inner plugging, outer capping) mounted on a single, short chassis/conveyor. Smart convertible system requires fewer filling heads and capping stations, reducing overall length and complexity.",
        highlights: [
          "Output: Up to 100 bottles per minute (BPM)",
          "Dosing: Highly precise peristaltic pumps or volumetric syringe pumps",
          "Volume range: 2ml to 50ml",
          "Compact monoblock design saves space",
          "Sterile integration under LAF hood or RABS enclosure",
          "Regulatory compliance ready",
          "Quick changeover capability",
        ],
      },
      {
        title: "Standard vial / micro vial filling line",
        imageSrc: PRODUCT_IMAGES.pro.vial,
        description: "Z AXIS VIAL 120/240: Complete vial processing line including washing, sterilization, filling, stoppering, and capping with integrated quality systems for pharmaceutical manufacturing.",
        highlights: [
          "Vial Washing Machine: Multi-stage internal & external washing using WFI and compressed air",
          "Sterilization & Depyrogenation Tunnel: Continuous dry-heat process",
          "ISO Class 5 environment (LAF/Isolator)",
          "High-precision dosing (servo/peristaltic/piston)",
          "Controlled rubber stoppering under sterile conditions",
          "Secure aluminium seal crimping",
          "In-Process Inspection System for fill volume, stopper presence, and defects",
          "Real-time environmental monitoring (viable & non-viable particles)",
        ],
      },
      {
        title: "Cartridge filling machine \n (Both end open cartridges)",
        imageSrc: PRODUCT_IMAGES.pro.cartridge,
        description: "Z AXIS-CART 40/100 SERIES: Advanced and efficient packaging system designed for filling and sealing of both end-open pre-sterile cartridges, with rubber stoppering, filling with glass bead insertion, and sealing.",
        highlights: [
          "Output: 40/100 cartridges per minute",
          "Cartridge sizes: 1.8ml/3ml",
          "Two-head/five-head servo-based filling mechanism for 90% filling",
          "Individual servo motor-based mechanism for remaining 10%",
          "High-precision SS316L syringes",
          "Precise inner rubber bunging (pneumatic or servo-based)",
          "Servo-based outer cap placement & sealing",
          "Leak-proof seal assurance",
        ],
      },
    ],
  },
  pre: {
    key: "pre",
    label: "Pre",
    title: "Z Axis Pre Systems",
    subtitle: "ISOCLEAN Containments, BSC, GIT",
    products: [
      {
        title: "Positive pressure isolator for sterile injectables",
        imageSrc: PRODUCT_IMAGES.pre.isolator,
        description: "Positive Pressure Isolator is critical for achieving high sterility, compliance, and product protection in injectable fill-finish operations. Maintains ISO Class 5 sterile conditions for aseptic filling.",
        highlights: [
          "Maintains ISO Class 5 sterile conditions",
          "Prevents microbial and particulate ingress",
          "Enhances product sterility assurance",
          "Reduces operator intervention and contamination risk",
          "Supports regulatory compliance (US FDA, EU GMP)",
          "Improves process consistency and safety",
        ],
      },
      {
        title: "Biological safety cabinets",
        imageSrc: PRODUCT_IMAGES.pre.bsc,
        description: "BSC provides personnel, product, and environmental protection by controlling aerosols and contamination, ensuring safe, sterile, and GMP-compliant handling of injectable and hazardous materials.",
        highlights: [
          "Protects operator, product, and environment",
          "Controls aerosols and cross-contamination",
          "Maintains clean, controlled airflow",
          "Ensures aseptic handling of injectables",
          "Supports GMP & regulatory compliance",
        ],
      },
      {
        title: "Glove integrity tester",
        imageSrc: PRODUCT_IMAGES.pre.git,
        description: "GIT verifies leak-free gloves in isolators and RABS, ensuring a reliable sterile barrier during aseptic injectable operations. Essential for aseptic integrity, regulatory compliance, and consistent injectable quality.",
        highlights: [
          "Detects micro-leaks (pinholes, tears) before and after use",
          "Prevents contamination ingress into critical filling zones",
          "Safeguards product sterility assurance (SAL)",
          "Enables routine, documented GMP compliance",
          "Compliant with EU GMP Annex 1, FDA",
          "Minimizes human intervention risk, batch loss, and recalls",
        ],
      },
      {
        title: "Contained transfer solutions",
        imageSrc: PRODUCT_IMAGES.pre.rtp,
        description: "Split Butterfly Valves and Rapid Transfer Ports (RTP) provide secure, contamination-free transfer of materials between controlled environments, maintaining sterility during aseptic operations.",
        highlights: [
          "Split Butterfly Valves for secure transfer",
          "Rapid Transfer Ports (RTP) technology",
          "Contamination-free material transfer",
          "Maintains sterile barrier integrity",
          "Suitable for isolator and RABS integration",
        ],
      },
    ],
  },
  core: {
    key: "core",
    label: "Core",
    title: "Z Axis Core Systems",
    subtitle: "VENERA Sterilization & depyrogenation tunnels",
    products: [
      {
        title: "Sterilizing & depyrogenation tunnels for vials / ampoules / cartridges",
        imageSrc: PRODUCT_IMAGES.core.tunnels,
        description: "Provide validated dry-heat sterilization for vials, ampoules, PFS, cartridges, and bottles. Ensure effective depyrogenation (endotoxin reduction) for injectables. Essential for sterile, pyrogen-free injectable manufacturing.",
        highlights: [
          "Validated dry-heat sterilization",
          "Effective depyrogenation (endotoxin reduction)",
          "Continuous, unidirectional flow into aseptic filling areas",
          "Minimizes human intervention and contamination risk",
          "Uniform temperature control and process repeatability",
          "Compliance with GMP, FDA, and EU GMP (Annex 1)",
          "Suitable for vials, ampoules, PFS, cartridges, and bottles",
        ],
      },
      {
        title: "Dual Chamber Pre-Filled Syringe Filling Machine",
        imageSrc: PRODUCT_IMAGES.core.dualChamberPfs,
        description: "Z Axis Pharmachine introduces a next-generation Dual Chamber Pre-Filled Syringe Filling Machine, designed for aseptic processing of Liquid + Liquid and Powder + Liquid. Built for high-performance sterile environments, the system ensures accurate dosing, chamber integrity, and seamless automation.",
        highlights: [
          "High Precision Filling: Peristaltic & auger-based dosing with ±0.5% accuracy",
          "Grade A Aseptic Compatibility: Designed for O-RABS / Isolator integration",
          "Sequential Stoppering & Sealing: Ensures complete separation & product integrity",
          "Advanced Automation: PLC–SCADA system with 21 CFR Part 11 compliance",
          "Flexible & Modular Architecture: Quick changeover across syringe formats",
        ],
      },
    ],
  },
};
