const   express                            = require('express');
const   router                             = express.Router();
const   {
        addsaleHistory,
        getsalesHistory,
        upadatesalesHistory,
        deleteSalesHistoryByDate
        }                                  = require('../controller/orderController');

const fetchuser  =require('../middleware/fetchusermiddleware');
const pdfService =require('../services/pdf-service');


router.post('/addhistory/:id',fetchuser,addsaleHistory);
router.get('/gethistory/:id',fetchuser,getsalesHistory);

router.put('/updatehistory/:id',fetchuser,upadatesalesHistory);
router.delete('/deletesaleshistory',fetchuser,deleteSalesHistoryByDate);

router.get('/invoice',(req,res)=>{
        const stream = res.writeHead(200,{
                'Content-Type':'application/pdf',
                'Content-Disposition':'attachment;filename=invoice.pdf'
        });
        pdfService.buildPDF(
                (chunk) => stream.write(chunk),
                () =>stream.end()
        );
});

module.exports = router;
