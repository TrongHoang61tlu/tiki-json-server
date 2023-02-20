const faker = require('faker');
const fs = require('fs');
faker.locale = "vi";

const randomCategoryList = (n)=>{
    if(n<=0) return [];
    const categoryList= []
    //loop and push category
    Array.from(new Array(n)).forEach(() =>{
        const category ={
            id : faker.datatype.uuid(),
            name : faker.commerce.department(),
            image : faker.image.imageUrl(),
            createdAt : Date.now(),
            updatedAt : Date.now()
        }

        categoryList.push(category)
    });
    return categoryList;
}

const randomProductList = (categoryList, numberOfProducts) => {
    if(numberOfProducts <=0) return [];

    const productList = []

    for (const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(()=>{
            const product = {
                categoryId : category.id,
                id : faker.datatype.uuid(),
                name : faker.commerce.productName(),
                corlor : faker.commerce.color(),
                price : faker.commerce.price(),
                picture : faker.image.imageUrl(),
                brandName : faker.company.companyName(),
                description : faker.lorem.sentences(),
                rate : faker.random.number({min : 0 , max : 5}),
                sold : faker.random.number({min : 0 , max : 1000}),
                date : faker.date.future(),
                streetAddress : faker.address.streetAddress(),
                city : faker.address.city(),
                state : faker.address.state(),
                country : faker.address.country(),
                createdAt : Date.now(),
                updatedAt : Date.now()
            }
            productList.push(product)
        });
        return productList;
    }
}

const randomCommentList = (productList, numberOfComments) =>{
    if(numberOfComments <=0) return [];

    const commentList  = []

    for (const product of productList) {
        Array.from(new Array(numberOfComments)).forEach(()=>{
            const comment = {
                productId : product.id,
                id : faker.datatype.uuid(),
                username : faker.commerce.productName(),
                comment : faker.lorem.sentences(),
                createdAt : Date.now(),
                updatedAt : Date.now()

            }
            commentList.push(comment);
        });
        return commentList;
        
    }
}

// IFFE
(() => {
    //random data
    const categoryList = randomCategoryList(6)
    const productList = randomProductList(categoryList, 50);
    const commentList = randomCommentList(productList, 20);

    //prepare db object
    const db = {
        categories : categoryList,
        product :  productList,
        comment : commentList,
        profile : [],
    };
    //write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () =>{
        console.log('Write data success');
    })
})();