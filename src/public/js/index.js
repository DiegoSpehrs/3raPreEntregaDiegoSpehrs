const socketClient = io()

const formularioAddProduct = document.getElementById('formAddProduct')
const title = document.getElementById('productTitle')
const description = document.getElementById('productDescription')
const price = document.getElementById('productPrice')
const thumbnail = document.getElementById('productThumbnail')
const code = document.getElementById('productCode')
const stock = document.getElementById('productStock')
const idProduct = document.getElementById('idProduct')

const formularioDeletProduct = document.getElementById('formDeleteProduct')
const divInRealTime = document.getElementById('productsInRealTime')
const id = document.getElementById('idProductDeleted')




formularioAddProduct.onsubmit = (e)=>{
    e.preventDefault()
    const product = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value,
    }
    socketClient.emit('addProduct',product)
}

formularioDeletProduct.onsubmit = (e)=>{
    e.preventDefault()
    const idproduct = parseInt(formularioDeletProduct.value)
    socketClient.emit('deletProduct', idproduct)
}

socketClient.on('addProductSuccess',async(product)=>{
    console.log(product);
    const newProduct = 
                    `<div>
                        <p> title: ${product.title}</p>
                        <p> description: ${productroduct.description}</p>
                        <p> price: $${productroduct.price}</p>
                        <p> imagen: ${productroduct.thumbnail}</p>
                        <p> code: ${productroduct.code}</p>
                        <p> stock: ${productroduct.stock}</p>
                        <p> id: ${product.id}</p>
                    </div>`
    ;
    divInRealTime.innerHTML = newProduct
})








