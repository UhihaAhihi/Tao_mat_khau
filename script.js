// Hàm kiểm tra độ mạnh của mật khẩu
function checkPasswordStrength(password) {
    let strength = 0;

    if (password.length < 8) {
        return "Yếu"; 
    }

    if (/[A-Z]/.test(password)) strength++; 
    if (/[a-z]/.test(password)) strength++; 
    if (/[0-9]/.test(password)) strength++; 
    if (/[\W]/.test(password)) strength++; 

    if (strength <= 2) return "Yếu"; 
    else if (strength === 3 || strength === 4) return "Trung bình"; 
    else return "Mạnh"; 
}

// Hàm tạo mật khẩu ngẫu nhiên mạnh
function generatePassword(length, includeUppercase, includeNumbers, includeSymbols) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characterSet = lowercase;
    if (includeUppercase) characterSet += uppercase;
    if (includeNumbers) characterSet += numbers;
    if (includeSymbols) characterSet += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }
    return password;
}

// Lắng nghe sự kiện khi nút "Kiểm tra độ mạnh mật khẩu" được nhấn
document.getElementById("check-strength").addEventListener("click", function() {
    const userPassword = document.getElementById("user-password").value;
    const strength = checkPasswordStrength(userPassword);
    
    const strengthOutput = document.getElementById("strength-output");
    strengthOutput.textContent = `Độ mạnh mật khẩu: ${strength}`;

    // Đưa ra đề xuất mật khẩu mới nếu mật khẩu yếu
    if (strength === "Yếu" || userPassword.length < 8) {
        const suggestion = generatePassword(12, true, true, true);
        document.getElementById("suggestion-output").textContent = `Mật khẩu mạnh đề xuất: ${suggestion}`;
        document.getElementById("copy-suggestion").style.display = "block"; // Hiện nút sao chép
    } else {
        document.getElementById("suggestion-output").textContent = "Không cần đề xuất. Mật khẩu của bạn đủ mạnh!";
        document.getElementById("copy-suggestion").style.display = "none"; // Ẩn nút sao chép
    }
});

// Thêm sự kiện cho nút sao chép
document.getElementById("copy-suggestion").addEventListener("click", function() {
    const suggestionText = document.getElementById("suggestion-output").textContent.replace("Mật khẩu mạnh đề xuất: ", "");
    navigator.clipboard.writeText(suggestionText)
        .then(() => {
            alert("Mật khẩu đã được sao chép vào clipboard!");
        })
        .catch(err => {
            console.error("Sao chép không thành công: ", err);
        });
});

// Lắng nghe sự kiện khi nút "Tạo mật khẩu" được nhấn
document.getElementById("generate").addEventListener("click", function() {
    const length = document.getElementById("length").value;
    const includeUppercase = document.getElementById("include-uppercase").checked;
    const includeNumbers = document.getElementById("include-numbers").checked;
    const includeSymbols = document.getElementById("include-symbols").checked;

    if (length > 1000) {
        document.getElementById("password-output").textContent = "Độ dài mật khẩu quá lớn. Vui lòng chọn độ dài tối đa là 1000.";
        return; 
    }

    const password = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);
    document.getElementById("password-output").textContent = password;
    document.getElementById("copy-generated").style.display = "block"; // Hiện nút sao chép
});

// Thêm sự kiện cho nút sao chép mật khẩu được tạo
document.getElementById("copy-generated").addEventListener("click", function() {
    const generatedPassword = document.getElementById("password-output").textContent;
    navigator.clipboard.writeText(generatedPassword)
        .then(() => {
            alert("Mật khẩu đã được sao chép vào clipboard!");
        })
        .catch(err => {
            console.error("Sao chép không thành công: ", err);
        });
});

// Lắng nghe sự kiện để hiển thị mật khẩu khi người dùng chọn "Hiển thị mật khẩu"
document.getElementById("show-password").addEventListener("change", function() {
    const passwordField = document.getElementById("user-password");
    if (this.checked) {
        passwordField.type = "text"; 
    } else {
        passwordField.type = "password"; 
    }
});
