import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
  quantity: number;
  photo: {
    type: String;
  };
  shipping?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      // data: Buffer,
      // contentType: String,
      type: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", ProductSchema);

// import mongoose, { Types } from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     category: {
//       type: Types.ObjectId,
//       ref: "category",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     photo: {
//       data: Buffer,
//       contentType: String,
//     },
//     shipping: {
//       type: Boolean,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("products", ProductSchema);
