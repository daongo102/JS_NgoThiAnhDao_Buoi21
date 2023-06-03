const dsnv = new DanhSachNhanVien();
const validation = new Validation();

//! LƯU LOCAL STORAGE
function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}


//! LẤY LOCAL STORAGE
function getLocalStorage() {
    var dataLocal = JSON.parse(localStorage.getItem("DSNV"));

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

    var isValid = true;

    //! Tài khoản
    isValid &= validation.checkEmpty(taiKhoan, "tbTKNV", "Tài khoản không được để trống.") && validation.checkID(taiKhoan, "tbTKNV", "Tài khoản không được trùng.", dsnv.mangNV) && validation.checkNumber(taiKhoan, "tbTKNV", "Tài khoản không đúng định dạng. Gồm 4 - 6 ký số, không bao gồm ký tự đặc biệt.");

    //! Tên NV
    isValid &= validation.checkEmpty(ten, "tbTen", "Họ và tên không được để trống.") && validation.checkName(ten, "tbTen", "Họ và tên chỉ được chứa ký tự chữ.");

    //! Email
    isValid &= validation.checkEmail(email, "tbEmail", "Email chưa đúng định dạng.");

    //! Mật khẩu
    isValid &= validation.checkPass(matKhau, "tbMatKhau","Mật khẩu: " + (document.getElementById("password").value) + " không hợp lệ! Gồm 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt.");

    //! Ngày làm
    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống") && validation.checkDay(ngayLam, "tbNgay", "Ngày làm đúng định dạng MM/DD/YYYY.");

    //! Lương
    isValid &= validation.checkEmpty(luong, "tbLuongCB", "Lương cơ bản không được để trống") && validation.checkLuong(luong, "tbLuongCB", "Lương cơ bản từ 1.000.000 đến 20.000.000");

    //! Chức vụ
    isValid &= validation.checkChucVu(chucVu, "tbChucVu", "Chức vụ không được để trống.");

    //! Giờ làm
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống.") && validation.checkGioLam(gioLam, "tbGiolam", "Giờ làm từ 80 - 200 giờ.");

    if (isValid) {
        var nv = new NhanVien(taiKhoan, ten, email, matKhau, ngayLam, Number(luong), chucVu, Number(gioLam));
        nv.calcLuong();
        nv.xepLoai();
        // console.log(nv)

        dsnv.themNV(nv);
        // console.log(dsnv.mangNV)  
        setLocalStorage();
        hienThiBang(dsnv.mangNV);
        alert('Thêm người dùng thành công');
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
    // console.log(content)
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
        var isValid = true;    

        //! Tên NV
        isValid &= validation.checkEmpty(ten, "tbTen", "Họ và tên không được để trống.") && validation.checkName(ten, "tbTen", "Họ và tên chỉ được chứa ký tự chữ.");

        //! Email
        isValid &= validation.checkEmail(email, "tbEmail", "Email chưa đúng định dạng.");

        //! Mật khẩu
        isValid &= validation.checkPass(matKhau, "tbMatKhau","Mật khẩu: " + (document.getElementById("password").value) + " không hợp lệ! Gồm 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt.");

        //! Ngày làm
        isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống.") && validation.checkDay(ngayLam, "tbNgay", "Ngày làm đúng định dạng MM/DD/YYYY.");

        //! Lương
        isValid &= validation.checkEmpty(luong, "tbLuongCB", "Lương cơ bản không được để trống.") && validation.checkLuong(luong, "tbLuongCB", "Lương cơ bản từ 1.000.000 đến 20.000.000");

        //! Chức vụ
        isValid &= validation.checkChucVu(chucVu, "tbChucVu", "Chức vụ không được để trống.");

        //! Giờ làm
        isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống.") && validation.checkGioLam(gioLam, "tbGiolam", "Giờ làm từ 80 - 200 giờ.");

        if (isValid) {
            setLocalStorage();
            hienThiBang(dsnv.mangNV);
            resetDL();
        }
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
    document.getElementById("tbChucVu").style.display = "none";
    document.getElementById("gioLam").value = "";
    document.getElementById("tbGiolam").style.display = "none";
}
document.getElementById("btnDong").onclick = resetDL;


//! TÌM NHÂN VIÊN THEO LOẠI
document.getElementById("searchName").onkeyup = function () {
    var tuTim = document.getElementById("searchName").value;
    var mangTK = dsnv.timKiemTheoLoaiNV(tuTim);
    hienThiBang(mangTK);
}


