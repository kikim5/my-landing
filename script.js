const revealElements = document.querySelectorAll('.reveal');

const scrollReveal = function() {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

const premiumForm = document.getElementById('premium-form');
const submitBtn = document.getElementById('submit-btn');
const formResult = document.getElementById('form-result');

premiumForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем...';
    formResult.textContent = '';

    const formData = new FormData(premiumForm);
    const payload = Object.fromEntries(formData);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.success) {
            premiumForm.reset();
            formResult.textContent = 'Заявка отправлена. Андрей Забожанов свяжется с вами в ближайшее время.';
        } else {
            formResult.textContent = 'Заявка не отправилась. Позвоните по номеру выше.';
        }
    } catch (error) {
        formResult.textContent = 'Заявка не отправилась. Позвоните по номеру выше.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Начать проектирование';
    }
});

