(function() {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js'; // Используем jQuery для упрощения работы
    script.onload = function() {
      // Код модального окна и формы
      const modalHTML = `
        <div id="modal" class="modal-overlay" style="display: none">
          <div class="modal">
            <h2>Request a Callback</h2>
            <p>We will contact you as soon as possible.</p>
            <form id="signupForm">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required pattern="[A-Za-z]{2,}">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required pattern="[A-Za-z]{2,}">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email address" required>
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required pattern="[+\d\-]{7,15}">
              </div>
              <button type="submit" class="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      `;
  
      // Вставляем HTML модального окна в body
      $('body').append(modalHTML);
  
      // Стиль для модального окна
      const style = `
        <style>
          body {
            font-family: 'Open Sans', sans-serif;
            background-color: #000;
            color: #fff;
          }
          .modal-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
          .modal {
            background: #fff;
            color: #000;
            border-radius: 12px;
            padding: 50px;
            width: 460px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          }
          .modal h2 {
            margin-top: 0;
            margin-bottom: 14px;
            font-size: 26px;
            text-align: center;
            font-weight: 600;
          }
          .modal p {
            text-align: center;
            margin-bottom: 35px;
            font-size: 15px;
          }
          .form-group {
            margin-bottom: 25px;
          }
          .form-group label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 600;
          }
          .form-group input {
            width: 100%;
            padding: 14px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }
          .form-group input:invalid {
            border-color: red;
          }
          .submit-btn {
            width: 100%;
            padding: 16px;
            background: #000;
            color: #fff;
            border: none;
            font-size: 16px;
            font-weight: 600;
            border-radius: 6px;
            cursor: pointer;
          }
          .submit-btn:hover {
            background: #222;
          }
        </style>
      `;
      
      // Вставляем стили на страницу
      $('head').append(style);
  
      // Показываем модальное окно через 15 секунд
      setTimeout(() => {
        $('#modal').show();
      }, 15000);
  
      // Обработчик отправки формы
      $('#signupForm').on('submit', function(e) {
        e.preventDefault();
        const data = new FormData(this);
        const text = `📝 New Callback Request:\n` +
          `👤 Name: ${data.get('firstName')} ${data.get('lastName')}\n` +
          `📧 Email: ${data.get('email')}\n` +
          `📞 Phone: ${data.get('phone')}`;
  
        fetch('https://api.telegram.org/bot7783372377:AAHUBqbO7MppYGZAGTur1W4lJmr7zhJvzR0/sendMessage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: 6138668244,
            text: text
          })
        }).then(() => {
          $('#modal').hide();
        }).catch(() => {
          alert('❌ Error sending to Telegram.');
        });
      });
    };
    document.head.appendChild(script);
  })();
  