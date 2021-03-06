// DOM------------------------------------------------------------->
var productID = JSON.parse(localStorage.getItem("productdb")) || [];
console.log("productID", productID)
var bag = JSON.parse(localStorage.getItem("bagItems")) || [];
var closet = JSON.parse(localStorage.getItem("closetItems")) || [];
// console.log("cartD!!!!",ele) 
// console.log("products",products)
// https://clone-dummy-ajio.herokuapp.com/
console.log("befpre")
displayData()

console.log("after")
async function displayData() {
    try {
        // const response =await fetch("http://localhost:4493/product/62151cd010a048bc3c186b2b");
        const response = await fetch(`/product/${productID}`);

        const data = await response.json();
        console.log(data)
        showDetails(data)
    }
    catch (err) {
        console.log(err.message)
    }
}

function showDetails(ele) {
    //  main_img-------------------------------------------------------------->
    var main_img = document.getElementById("main_img");

    var img = document.createElement("img");
    img.setAttribute("src", `${ele.image.img1}`);
    // console.log(ele.image.img1)
    img.setAttribute("id", "center_image");

    // leftbox----------------------------------------------------------->
    //  side_img1-------------------------------------------------------------->
    var innerBox1 = document.getElementById("innerBox1");
    var small_image1 = document.createElement("img");
    small_image1.setAttribute("src", ele.image.img1);
    small_image1.setAttribute("id", "small_image1");

    // //  side_img2--------------------------------------------------------->
    var innerBox2 = document.getElementById("innerBox2");
    var small_image2 = document.createElement("img");
    small_image2.setAttribute("src", ele.image.img2);
    small_image2.setAttribute("id", "small_image2");
    //  side_img3--------------------------------------------------------->
    var innerBox3 = document.getElementById("innerBox3");
    var small_image3 = document.createElement("img");
    small_image3.setAttribute("src", ele.image.img3);
    small_image3.setAttribute("id", "small_image3");

    // rightbox-------------------------------------------------------->
    var pName = document.getElementById("pName");
    var product_name = document.createElement("h4");
    product_name.setAttribute("id", "product_name");
    product_name.innerText = ele.name;
    console.log(ele.name)

    var pDetails = document.getElementById("pDetails");
    var product_details = document.createElement("h4");
    product_details.setAttribute("id", "product_details");
    product_details.innerText = ele.details;

    var dPrice = document.getElementById("dPrice");
    var product_dPrice = document.createElement("h4");
    product_dPrice.setAttribute("id", "product_dPrice");
    product_dPrice.innerText = ele.discount_price;

    var price_main = document.getElementById("price_main");
    var product_main_Price = document.createElement("h4");
    product_main_Price.setAttribute("id", "product_main_Price");
    product_main_Price.innerText = ele.main_price;


    var pdiscount = document.getElementById("pdiscount");
    var product_pdiscount = document.createElement("h3");
    product_pdiscount.setAttribute("id", "product_pdiscount");
    product_pdiscount.innerText = `( ${ele.discount}%)`;
    // //  append--------------------------------pName------------------------------------->
    main_img.append(img);
    innerBox1.append(small_image1);
    innerBox2.append(small_image2);
    innerBox3.append(small_image3);
    pName.append(product_name);
    pDetails.append(product_details);
    dPrice.append(product_dPrice);
    price_main.append(product_main_Price);
    pdiscount.append(product_pdiscount);



    // size Button---------------------------------->
    addSize = document.getElementById("size");
    addSize.addEventListener("click", addS);
    var count = 0;
    function addS() {
        console.log("count:", count);
        count++;

    }
    // BAG BUTTON----------------------------------------------------------------->

    // console.log(ele)
    // console.log(bag.quant)
    var bagBtn = document.getElementById("bag")
    bagBtn.addEventListener("click", dataforCart)
    function dataforCart() {

        for (let i = 0; i < bag.length; i++) {

            if (bag[i].id == ele.id) {

                ele.quant = ele.quant + 1;

                bag.splice(i, 1);
                break;
            }
        }
        if (count >= 1) {
            bag.push(ele);
            localStorage.setItem("bagItems", JSON.stringify(bag));
            console.log("bag", bag)
        }
        else {
            alert("Please Select size first")
        }

    }

    // CLOSEST BUTTON---------------------------------------------------->
    var closetBtn = document.getElementById("closet");
    closetBtn.addEventListener("click", dataforCloset);
    function dataforCloset() {

        if (count >= 1) {
            closet.push(ele);
            localStorage.setItem("closetItems", JSON.stringify(closet));
            console.log("closet", closet)
        }
        else {
            alert("Please Select size first")
        }
    }

    // // var cBtn=document.getElementById("cBtn");
    // // cBtn.addEventListener("click",gotoCloset);
    // // function gotoCloset(){
    // //   location.href = 'closet.html'
    // // }
    // When we click on left-side small images they are display in main box-------------->
    small_image1.addEventListener("click", showImg1);
    function showImg1() {
        console.log("bbcb", ele.image)
        main_img.innerHTML = "";
        var small1 = document.createElement("img");
        small1.setAttribute("src", `${ele.image.img1}`);
        small1.setAttribute("id", "imgg1")


        main_img.append(small1);
    }
    small_image2.addEventListener("click", showImg2);
    function showImg2() {

        main_img.innerHTML = "";
        var small2 = document.createElement("img");
        small2.setAttribute("src", `${ele.image.img2}`);
        small2.setAttribute("id", "imgg2")


        main_img.append(small2);
    }

    small_image3.addEventListener("click", showImg3);
    function showImg3() {
        main_img.innerHTML = "";
        var small3 = document.createElement("img");
        small3.setAttribute("src", `${ele.image.img3}`);
        small3.setAttribute("id", "imgg3")


        main_img.append(small3);
    }

}