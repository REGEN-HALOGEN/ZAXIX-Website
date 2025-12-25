export type SystemKey = "pro" | "pre" | "core";

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
    products: Array<{ title: string; imageSrc?: string }>;
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
      },
      {
        title: "Basic automatic PFS machines for syringes and cartridges (India & South Asia)",
        imageSrc: PRODUCT_IMAGES.pro.fullyAutoPfs,
      },
      { title: "Robotic PFS Machines For syringes and cartridges", imageSrc: PRODUCT_IMAGES.pro.roboticPfs },
      {
        title: "Plunger rod insertion & labelling machine for PFS",
        imageSrc: PRODUCT_IMAGES.pro.plungerLabel,
      },
      {
        title: "Flush syringe filling & tip capping machine (reverse filling)",
        imageSrc: PRODUCT_IMAGES.pro.flush,
      },
      {
        title: "Labelling machine for flush syringes (PFS & cartridges)",
        imageSrc: PRODUCT_IMAGES.pro.labellingFlush,
      },
      {
        title: "Nasal drops / eye-ear drops filling machine",
        imageSrc: PRODUCT_IMAGES.pro.nasal,
      },
      {
        title: "Standard vial / micro vial filling line",
        imageSrc: PRODUCT_IMAGES.pro.vial,
      },
      { title: "Cartridge filling machine \n (Both end open cartridges)", imageSrc: PRODUCT_IMAGES.pro.cartridge },
    ],
  },
  pre: {
    key: "pre",
    label: "Pre",
    title: "Z Axis Pre Systems",
    subtitle: "ISOCLEAN Containments , BSC , GIT",
    products: [
      {
        title: "Positive pressure isolator for sterile injectables",
        imageSrc: PRODUCT_IMAGES.pre.isolator,
      },
      {
        title: "Biological safety cabinets",
        imageSrc: PRODUCT_IMAGES.pre.bsc,
      },
      { title: "Glove integrity tester", imageSrc: PRODUCT_IMAGES.pre.git },
      {
        title: "Contained transfer solutions",
        imageSrc: PRODUCT_IMAGES.pre.rtp,
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
      },
    ],
  },
};
