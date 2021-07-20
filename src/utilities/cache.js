export const images = [
  "../resources/images/background_big.jpg",
  "../resources/images/background_mobile.jpg",
  "../resources/images/header_sushi_guild.png",
  "../resources/images/kitty.png",
  "../resources/images/moonkin/mk_sitting_eating_1.png",
  "../resources/images/moonkin/mk_sitting_eating_2.png",
  "../resources/images/moonkin/mk_sitting_straight.png",
  "../resources/images/moonkin/mk_standing_looking_right.png",
  "../resources/images/moonkin/mk_standing_straight.png",
  "../resources/images/potion_vial/bottle_body.png",
  "../resources/images/potion_vial/bottle_outline.png",
  "../resources/images/potion_vial/bottle_top.png",
  "../resources/images/potion_vial/cork.png",
  "../resources/images/potion_vial/reflection_bottom.png",
  "../resources/images/potion_vial/reflection_top.png",
];

export const deathrollImages = [
  { ike_sitting: "../resources/images/ike/ike_sitting_1.png" },
  { fireplace: "../resources/images/ike/fireplace_1.png" },
  { fire: "../resources/images/ike/fire_2.gif" },
];

// const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//   cacheImages(images);
// }, []);

// const cacheImages = async (srcArray) => {
//   let arr = [];
//   const promises = await srcArray.map((src) => {
//     return new Promise(function (resolve, reject) {
//       const img = new Image();

//       img.src = src;
//       img.onload = resolve();
//       img.onerror = reject();
//       arr.push(img);
//     });
//   });

//   await Promise.all(promises);
//   setIsLoading(false);
// };
