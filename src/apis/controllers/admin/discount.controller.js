const httpStatus = require('http-status')
const catchAsync = require('../../../utils/catch-async')
const { discountService } = require('../../services')
const { Discount } = require('../../models')

const add = catchAsync(async (req, res) => {
    console.log(req.body)
    try{
    const discount = await discountService.creates(req.body)
    res.status(httpStatus.CREATED).json({
        success: true,
        discount: discount
    });
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Mã thương hiệu đã tồn tại",
            error: error
        })
    }
})
const list = catchAsync(async (req, res) => {
    const page = req.query.page
    const size = req.query.size
    const List = await discountService.view(page,size)
    res.status(httpStatus.OK).json({
        success: true,
        discount: List
    });
})
const search = catchAsync(async (req, res, next) => {
    const key = new RegExp(req.params.key)
    const List = await discountService.search(key)
    res.status(httpStatus.OK).json({
        success: true,
        discount: List
    });
})
const view = catchAsync(async (req, res) => {
    const discount = await Discount.findById(req.params.id)
        if(!discount){
            return res.status(500).json({
                success: false,
                message: 'No brands existed'
            });
        }
        res.json({
            success: true,
            discount: discount
        });
})

const edit = catchAsync(async (req, res) => {
    const id = req.params.id
    const discount = await  discountService.updates(id,req.body)
    res.status(httpStatus.OK).json({
        success: true,
        discount: discount
    });

})
const deletes = catchAsync(async (req, res, next) => {
    Discount.findByIdAndRemove(req.params.id).then(news=>{
        if(news){
            return res.status(200).json({
                success: true,
                message: 'The news is deleted!'
            });
        }else{
            return res.status(404).json({
                success: false,
                message: 'news not Found'
            });
        }
    }).catch(error=>{
        return res.status(500).json({
            success: false,
            error: error
        });
    })
})
module.exports = {
    add,
    view,
    deletes,
    edit,
    search,
    list
}
