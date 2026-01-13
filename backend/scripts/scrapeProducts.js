import axios from "axios";
import * as cheerio from "cheerio";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connect
mongoose.connect(process.env.MONGO_URI);

const scrapeProducts = async () => {
  const url = "https://essentialaquatech.com/shop/";

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const products = [];

  $(".product").each((i, el) => {
    const name = $(el)
      .find(".woocommerce-loop-product__title")
      .text()
      .trim();

    const priceText = $(el)
      .find(".price")
      .first()
      .text()
      .replace(/[^0-9]/g, "");

    const image = $(el).find("img").first().attr("src");

    if (name && priceText) {
      products.push({
        name,
        price: Number(priceText),
        unit: "Unit",
        image
      });
    }
  });

  // Save to DB (avoid duplicates)
  for (const p of products) {
    const exists = await Product.findOne({ name: p.name });
    if (!exists) {
      await Product.create(p);
    }
  }

  console.log("✅ Products scraped & saved successfully");
  mongoose.disconnect();
};

scrapeProducts();
