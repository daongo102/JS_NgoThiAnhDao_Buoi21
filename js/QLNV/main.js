const dsnv = new DanhSachNhanVien();
const validation = new Validation();

//! LƯU LOCAL STORAGE
function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}


//! LẤY LOCAL STORAGE
function getLocalStorage() {
    var dataLocal = JSON.parse(localStorage.getItem("DSNV"));
    // console.log(dataLocal)
    if (dataLocal !== null) {
        hienThiBang(dataLocal);
        dsnv.mangNV = dataLocal;
    }
}
getLocalStorage();


// !THÊM NHÂN VIÊN
function themNhanVien() {
    var taiKhoan = document.getElementById("tknv").value;
    var ten = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matKhau = document.getElementById("password").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luong = document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLam = document.getElementById("gioLam").value;

    // console.log(taiKhoan,ten,email,matKhau,ngayLam,luong,chucVu,gioLam)
    var isValid = true;

    isValid &= validation.checkEmpty(taiKhoan, "tbTKNV", "Tài khoản không được để trống") && validation.checkID(taiKhoan, "tbTKNV", "Tài khoản không được trùng",dsnv.mangNV) && validation.checkNumber(taiKhoan, "tbTKNV", "Tài khoản không đúng định dạng. Gồm 4 - 6 số");
    isValid &= validation.checkEmpty(ten, "tbTen", "Họ và tên không được để trống") && validation.checkName(ten, "tbTen", "Họ và tên chỉ được chứa ký tự chữ");
    isValid &= validation.checkEmail(email, "tbEmail", "Email chưa đúng định dạng");
    isValid &= validation.checkPass(matKhau, "tbMatKhau", "- Mật khẩu không hợp lệ. Gồm 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt");
    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống");
    isValid &= validation.checkEmpty(luong, "tbLuongCB", "Lương cơ bản không được để trống");
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống");

    if (isValid) {
        var nv = new NhanVien(taiKhoan, ten, email, matKhau, ngayLam, Number(luong), chucVu, Number(gioLam));
        nv.calcLuong();
        nv.xepLoai();
        // console.log(nv)

        dsnv.themNV(nv);
        // console.log(dsnv.mangNV)  
        setLocalStorage();
        hienThiBang(dsnv.mangNV);
        resetDL();
    }
}
document.getElementById("btnThemNV").onclick = themNhanVien;


// !HIỂN THỊ BẢNG
function hienThiBang(mang) {
    var content = "";
    mang.map(function (nv, index) {
        var trNV = `<tr>
            <td>${nv.taiKhoanNV}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.emailNV}</td>       
            <td>${nv.ngayLamNV}</td>        
            <td>${nv.chucVuNV}</td>        
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNV}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoanNV}')">Xóa</button>
                <button data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="xemThongTin('${nv.taiKhoanNV}')">Xem</button>
            </td>         
        </tr>`;
        content += trNV;
    })
    // console.log(content)image.png
    document.getElementById("tableDanhSach").innerHTML = content;
}


//! XÓA
function xoaNhanVien(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
    hienThiBang(dsnv.mangNV);
    setLocalStorage();
}


//! XEM
function xemThongTin(taiKhoan) {
    var indexFind = dsnv.timIndex(taiKhoan);
    if (indexFind > -1) {
        // console.log(dsnv.mangNV[indexFind]);
        var nvFind = dsnv.mangNV[indexFind];
        document.getElementById("tknv").value = nvFind.taiKhoanNV;
        document.getElementById("tknv").disabled = true;
        document.getElementById("name").value = nvFind.tenNV;
        document.getElementById("email").value = nvFind.emailNV;
        document.getElementById("password").value = nvFind.matKhauNV;
        document.getElementById("datepicker").value = nvFind.ngayLamNV;
        document.getElementById("luongCB").value = nvFind.luongNV;
        document.getElementById("chucvu").value = nvFind.chucVuNV;
        document.getElementById("gioLam").value = nvFind.gioLamNV;
    }
}

//! CẬP NHẬT
function capNhatThongTin() {
    var taiKhoan = document.getElementById("tknv").value;
    var ten = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matKhau = document.getElementById("password").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luong = document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLam = document.getElementById("gioLam").value;

    var nv = new NhanVien(taiKhoan, ten, email, matKhau, ngayLam, Number(luong), chucVu, Number(gioLam));
    nv.calcLuong();
    nv.xepLoai();
    // console.log(nv)

    var ketQua = dsnv.capNhat(nv);
    if (ketQua) {
        setLocalStorage();
        hienThiBang(dsnv.mangNV);
        resetDL();
    } else {
        alert("Cập nhật thất bại!")
    }
}
document.getElementById("btnCapNhat").onclick = capNhatThongTin;


//! RESET
function resetDL() {
    document.getElementById("tknv").value = "";    
    document.getElementById("tknv").disabled = false;
    document.getElementById("tbTKNV").style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("tbTen").style.display = "none";
    document.getElementById("email").value = "";
    document.getElementById("tbEmail").style.display = "none";
    document.getElementById("password").value = "";
    document.getElementById("tbMatKhau").style.display = "none";
    document.getElementById("datepicker").value = "";
    document.getElementById("tbNgay").style.display = "none";
    document.getElementById("luongCB").value = "";
    document.getElementById("tbLuongCB").style.display = "none";
    document.getElementById("chucvu").value = "Chọn chức vụ";
    document.getElementById("gioLam").value = "";
    document.getElementById("tbGiolam").style.display = "none";
}
document.getElementById("btnThem").onclick = resetDL;