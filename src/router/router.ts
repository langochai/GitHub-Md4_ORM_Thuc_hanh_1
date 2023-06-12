import express from "express";
const router = express.Router();
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/upload')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });
import {Product} from "../entity/Product";
import {AppDataSource} from "../data-source"

router.get('/',(req, res)=>{
    res.redirect('/products/create')
})
router.get('/products/create',(req, res)=>{
    res.render('create')
})
router.post("/products/create", upload.single('image'), async (req: any, res: any) => {
    try {

        let product = new Product();
        product.price = req.body.price;
        product.name = req.body.name;
        product.image = req.file.originalname;
        product.author = req.body.author;

        const productRepository = AppDataSource.getRepository(Product)
        await productRepository.save(product);
        res.redirect("/products")
    }catch (e) {
        console.log(e.message);
    }
});
router.get('/products', async (req, res) => {
    let products = await AppDataSource.getRepository(Product) .find();
    res.render('list', {products: products});
})
export default router