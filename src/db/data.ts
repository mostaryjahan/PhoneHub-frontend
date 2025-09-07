export const NavbarMenu = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Products", link: "/allProducts", isMegaMenu: true },
  { id: 3, title: "Hot Deals", link: "/hot-deals" },
  { id: 4, title: "About", link: "/about" },
  { id: 5, title: "Contact", link: "/contact" },
  { id: 5, title: "Support", link: "/support" },
];

export const MegaMenuData = {
  categories: [
    {
      id: 1,
      name: "By Brand",
      items: [
        { id: 1, name: "Apple iPhone", link: "/category/apple" },
        { id: 2, name: "Samsung", link: "/category/samsung" },
        { id: 3, name: "Google Pixel", link: "/category/google" },
        { id: 4, name: "Xiaomi", link: "/category/xiaomi" },
        { id: 5, name: "Motorola", link: "/category/motorola" },
        { id: 6, name: "OnePlus", link: "/category/oneplus" },
      ],
    },
    {
      id: 2,
      name: "By Price",
      items: [
        { id: 1, name: "Budget (Under $300)", link: "/category/budget" },
        { id: 2, name: "Mid-Range ($300-$700)", link: "/category/mid-range" },
        { id: 3, name: "Flagship ($700+)", link: "/category/flagship" },
      ],
    },
    {
      id: 3,
      name: "By Feature",
      items: [
        { id: 1, name: "5G Phones", link: "/category/5g" },
        { id: 2, name: "Gaming Phones", link: "/category/gaming" },
        { id: 3, name: "Camera Phones", link: "/category/camera" },
        { id: 4, name: "Long Battery Life", link: "/category/battery" },
      ],
    }
  ],
};