const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const multer = require('multer');

// Cấu hình lưu file vào RAM (Bộ nhớ tạm) để truyền thẳng lên Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', carController.getCars);

// CHÚ Ý: Dùng upload.array('images', 5) -> Cho phép upload tối đa 5 ảnh với key là 'images'
router.post('/', upload.array('images', 5), carController.createCar); 
router.put('/:id', upload.array('images', 5), carController.updateCar); 
router.delete('/:id', carController.deleteCar);

module.exports = router;