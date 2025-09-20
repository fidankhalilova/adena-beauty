import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: "http://localhost:1337/api",
  timeout: 1000,
});

const getApiData = async (endpoint) => {
  try {
    const response = await AxiosInstance.get(endpoint);
    return response;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const ProductListHtmlView = document.querySelector("#product-list");

const renderProductList = (products) => {
  products?.map((product) => {
    ProductListHtmlView.innerHTML += `
    <div id="product" class="flex flex-col gap-4">
          <div id="main-img" class="relative">
            <img src=${`http://localhost:1337${product.MainImage.url}`} alt=""
              class="w-[280px] h-[330px] object-cover block">

            <div id="hover-img" class="h-full w-full opacity-0 duration-500 hover:opacity-100 inset-0 absolute">
              <img src=${`http://localhost:1337${product.HoverImage.url}`} alt=""
                class="w-[280px] h-[330px] object-cover z-1 relative">

              <div class="w-full h-full top-0 absolute z-10 flex flex-col justify-center items-center">
                <div id="action_btns" class="flex flex-row justify-center items-center gap-3">
                  <div>
                    <i
                      class="ri-shopping-bag-2-line px-3 py-3 rounded-full duration-300 bg-white hover:bg-[#655330] hover:text-white"></i>
                  </div>
                  <div>
                    <i
                      class="ri-heart-line px-3 py-3 rounded-full duration-300 bg-white hover:bg-[#655330] hover:text-white"></i>
                  </div>
                  <div>
                    <i
                      class="ri-arrow-left-right-fill px-3 py-3 rounded-full duration-300 bg-white hover:bg-[#655330] hover:text-white"></i>
                  </div>
                  <div onclick="openModal()">
                    <i
                      class="ri-search-line px-3 py-3 rounded-full duration-300 bg-white hover:bg-[#655330] hover:text-white"></i>
                  </div>

                  <div id="overlay" class="fixed inset-0 bg-black/50 hidden z-40"></div>

                  <div id="modal" class="fixed inset-0 flex items-center justify-center hidden z-50">
                    <div class="bg-white w-[90%] max-w-4xl rounded-lg shadow-lg relative">

                      <button class="absolute top-4 right-4 text-gray-500 hover:text-black"
                        onclick="closeModal()">✕</button>

                      <div class="grid grid-cols-1 md:grid-cols-2">

                        <div class="p-6 flex justify-center items-center">
                          <img src=${`http://localhost:1337${product.MainImage.url}`}
                            alt="Product" class="rounded-lg">
                        </div>

                        <div class="p-6 space-y-4">
                          <h2 class="text-2xl font-semibold">${product.Name}</h2>
                          <p class="text-sm text-gray-500">By Wpbingo</p>
                          <p class="text-gray-400 line-through">$${product.DiscountPrice.toFixed(2)}</p>
                          <p class="text-xl font-bold text-red-600">$${product.Price.toFixed(2)}</p>
                          <p class="text-gray-600 text-sm">
                            ${product.Description}
                          </p>

                          <div>
                            <p class="text-sm mb-2">Color:</p>
                            <div class="flex gap-2">
                              <button class="w-8 h-8 border rounded-full bg-gray-400"></button>
                              <button class="w-8 h-8 border rounded-full bg-yellow-400"></button>
                            </div>
                          </div>

                          <p class="text-green-600 text-sm">✔ In stock</p>

                          <div class="flex gap-2 items-center">
                            <input type="number" value="1" class="w-16 border rounded-lg text-center p-2">
                            <button class="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div id="percent" class="absolute z-8 top-3 left-3">
              <p class="px-2 py-1 bg-[#d96e40] text-white text-[14px]">-18%</p>
            </div>
          </div>
          <div id="prod_txt" class="flex flex-col gap-2">
            <h1 class="text-[16px] font-light text-[#111]">${product.Name}</h1>
            <div id="price" class="flex flex-row gap-2">
              <p id="discounted" class="text-[#d96d3f] line-through text-[16px]">$${product.DiscountPrice.toFixed(2)}</p>
              <p class="text-[#111] line-through text-[16px]">$${product.Price.toFixed(2)}</p>
            </div>
            <ul class="flex flex-row gap-2">
              <li class="w-6 h-6 rounded-full bg-[#fff555] border border-gray-100"></li>
              <li class="w-6 h-6 rounded-full bg-[#fff555] border border-gray-100"></li>
              <li class="w-6 h-6 rounded-full bg-[#fff555] border border-gray-100"></li>
            </ul>
          </div>
        </div>`;

  });
};

getApiData("/products?populate=*").then((res) => {
  console.log(res?.data?.data);
  renderProductList(res?.data?.data);
});