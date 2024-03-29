var originalTotalPrice = 0; // เก็บราคารวมเดิม
var discountCodeUsed = ""; // เก็บรหัสโค้ดส่วนลดที่ใช้
var discountAmount = 0; // เก็บจำนวนเงินที่ลด

function calculateTotal() {
  var totalPrice = 0;
  var form = document.getElementById('productForm');
  var checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(function(checkbox) {
    totalPrice += parseInt(checkbox.value);
  });

  // เก็บราคารวมเดิม
  originalTotalPrice = totalPrice;

  // แสดงราคารวมหลังจากส่วนลด
  displayTotalPrice(totalPrice);
}

function applyDiscount() {
  var totalPrice = originalTotalPrice; // ใช้ราคารวมเดิม
  var discountCode = document.getElementById('discountCode').value;
  
  if (discountCode === "DISCOUNT50") {
    totalPrice -= 50; // ลด 50 บาท
    discountCodeUsed = "DISCOUNT50";
    discountAmount = 50;
    document.getElementById('discountInfo').textContent = "Discount code used: " + discountCodeUsed + ", Discount amount: " + discountAmount.toFixed(2) + " บาท";
  } else if (discountCode === "OFF10") {
    var discount = originalTotalPrice * 0.1;
    totalPrice -= discount; // ลด 10%
    discountCodeUsed = "OFF10";
    discountAmount = discount;
    document.getElementById('discountInfo').textContent = "Discount code used: " + discountCodeUsed + ", Discount amount: " + discountAmount.toFixed(2) + " บาท";
  } else if (discountCode === "") {
    document.getElementById('discountInfo').textContent = "ไม่มีการใช้ส่วนลดจากโค้ด";
  } else {
    document.getElementById('discountInfo').textContent = "ส่วนลดไม่ถูกต้อง";
  }
  // แสดงข้อมูลส่วนลด
  // แสดงราคารวมหลังจากส่วนลด
  displayTotalPrice(totalPrice);
}

function applyPointsDiscount() {
  var customerPoints = parseInt(document.getElementById('customerPoints').value);
  var totalPrice = originalTotalPrice; // ใช้ราคารวมเดิม

  // หาราคาหลังลดราคาจากโค้ด
  var discountedPrice = totalPrice;

  if (discountCodeUsed !== "") {
    discountedPrice -= discountAmount;
  }

  // ตรวจสอบและคำนวณการลดราคาจากแต้มลูกค้า
  var pointDiscount = 0;
  if (customerPoints > 0) {
    var maxPointsDiscount = discountedPrice * 0.2; // 20% ของราคาหลังลดราคาจากโค้ด
    if (customerPoints > maxPointsDiscount) {
      document.getElementById('pointsDiscountInfo').textContent = "ไม่สามารถใช้แต้มเกิน 20% ของราคาได้";
      return; // ออกจากฟังก์ชันเพื่อไม่ทำการลดราคา
    }

    pointDiscount = Math.min(customerPoints, discountedPrice); // หาค่าน้อยสุดระหว่างจำนวนแต้มและราคาหลังลดราคาจากโค้ด
    discountedPrice -= pointDiscount; // ลดราคาตามจำนวนแต้มที่น้อยสุด
  }

  // แสดงข้อมูลส่วนลดจากแต้ม
  document.getElementById('pointsDiscountInfo').textContent = "Points discount: " + pointDiscount.toFixed(2) + " บาท";

  // แสดงราคารวมหลังจากส่วนลดทั้งหมด
  displayTotalPrice(discountedPrice);
}



function calculateTotal() {
  var totalPrice = 0;
  var form = document.getElementById('productForm');
  var checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(function(checkbox) {
    totalPrice += parseInt(checkbox.value);
  });

  // เก็บราคารวมเดิม
  originalTotalPrice = totalPrice;

  // แสดงราคารวมหลังจากส่วนลด
  displayTotalPrice(totalPrice);
}

function cancelDiscount() {
  // เรียกใช้ฟังก์ชันคำนวณราคารวมอีกครั้งเพื่อล้างส่วนลดทั้งหมด
  calculateTotal();

  // ล้างข้อมูลของส่วนลด
  document.getElementById('discountInfo').textContent = "";

  // ล้างข้อมูลในช่องกรอกโค้ด
  document.getElementById('discountCode').value = "";
}

function cancelPointsDiscount() {
  var totalPrice = originalTotalPrice; // เริ่มต้นที่ราคาหลังจากหักส่วนลดโค้ด

  // ถ้ามีโค้ดส่วนลดใช้งานอยู่ ให้ลดราคาตามโค้ดส่วนลด
  if (discountCodeUsed !== "") {
    totalPrice -= discountAmount;
  }

  // ล้างช่องแต้มเป็น 0
  document.getElementById('pointsDiscountInfo').textContent = "";
  document.getElementById('customerPoints').value = 0;

  // แสดงราคารวมหลังจากยกเลิกการใช้แต้ม
  displayTotalPrice(totalPrice);
}


function displayTotalPrice(totalPrice) {
  // แสดงราคารวมหลังจากส่วนลด
  document.getElementById('totalPrice').textContent = "Total price: " + totalPrice.toFixed(2) + " บาท";
}
