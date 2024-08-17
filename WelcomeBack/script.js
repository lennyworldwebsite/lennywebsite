document.addEventListener('DOMContentLoaded', function() {
    const rmnCaseFileBtn = document.getElementById('rmnCaseFileBtn');
    const fallOffBtn = document.getElementById('fallOffBtn');
    const rmnTextContainer = document.getElementById('rmnTextContainer');
    const countdownContainer = document.getElementById('countdownContainer');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const countdownElement = document.getElementById('countdown');
    const rmnText = document.getElementById('rmnText');
    const ytEmbedContainer = document.getElementById('ytEmbedContainer');
    
    let countdownInterval;
    let tickingSound = new Audio('https://www.soundjay.com/button/beep-07.wav');
    tickingSound.loop = true;

    // Typing effect for RMN Case File button
    rmnCaseFileBtn.addEventListener('click', function() {
        rmnTextContainer.classList.remove('hidden');
        rmnText.innerHTML = "";
        typeWriter('RMN Case File Text...', 0, () => {
            nextBtn.classList.remove('hidden');
            backBtn.classList.remove('hidden');
        });
        hideButtons();
    });

    function typeWriter(text, index, callback) {
        if (index < text.length) {
            rmnText.innerHTML += text.charAt(index);
            setTimeout(() => typeWriter(text, index + 1, callback), 100);
        } else if (callback) {
            callback();
        }
    }

    // Countdown for Fall Off button
    fallOffBtn.addEventListener('click', function() {
        countdownContainer.classList.remove('hidden');
        startCountdown(new Date('2024-08-31T21:00:00Z'));
        tickingSound.play();
        hideButtons();
    });

    function startCountdown(targetDate) {
        let lastTime = null;

        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                tickingSound.pause();
                tickingSound.currentTime = 0;
                countdownElement.innerHTML = "RMN Fall Off: NOW";
                ytEmbedContainer.classList.remove('hidden');
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const currentTime = { days, hours, minutes, seconds };

            if (!lastTime) {
                lastTime = { ...currentTime };
            }

            updateCountdown(currentTime, lastTime);

            lastTime = { ...currentTime };
        }, 1000);
    }

    function updateCountdown(current, last) {
        const countdownString = formatTime(current);
        countdownElement.innerHTML = '';

        let index = 0;
        countdownString.forEach(char => {
            const span = document.createElement('span');
            if (char.match(/[0-9]/)) {
                const isChanged = didNumberChange(index, current, last);
                span.classList.add('animated');
                if (isChanged) {
                    span.classList.add('up-down');
                }
            }
            span.textContent = char;
            countdownElement.appendChild(span);
            index++;
        });

        setTimeout(() => {
            document.querySelectorAll('.animated.up-down').forEach(el => {
                el.classList.remove('up-down');
            });
        }, 600); // Animation duration
    }

    function formatTime({ days, hours, minutes, seconds }) {
        return `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`.split('');
    }

    function didNumberChange(index, current, last) {
        const map = {
            0: 'days',
            1: 'days',
            3: 'hours',
            4: 'hours',
            6: 'minutes',
            7: 'minutes',
            9: 'seconds',
            10: 'seconds'
        };

        const timeType = map[index];
        if (!timeType) return false;

        const currentVal = String(current[timeType]).padStart(2, '0')[index % 2];
        const lastVal = String(last[timeType]).padStart(2, '0')[index % 2];

        return currentVal !== lastVal;
    }

    // Hide RMN Case File and Fall Off buttons
    function hideButtons() {
        rmnCaseFileBtn.classList.add('hidden');
        fallOffBtn.classList.add('hidden');
    }

    // Back button functionality
    backBtn.addEventListener('click', function() {
        nextBtn.classList.add('hidden');
        backBtn.classList.add('hidden');
        rmnTextContainer.classList.add('hidden');
        countdownContainer.classList.add('hidden');
        ytEmbedContainer.classList.add('hidden');
        rmnCaseFileBtn.classList.remove('hidden');
        fallOffBtn.classList.remove('hidden');
        clearInterval(countdownInterval);
        tickingSound.pause();
        tickingSound.currentTime = 0;
    });

    // Next button functionality
    nextBtn.addEventListener('click', function() {
        window.location.href = 'nextpage.html'; // Redirect to a different page
    });

    // Testing feature to skip countdown
    let testKeyPressCount = 0;
    document.addEventListener('keydown', function(event) {
        if (event.key.toLowerCase() === 't') {
            testKeyPressCount++;
            if (testKeyPressCount === 6) {
                clearInterval(countdownInterval);
                tickingSound.pause();
                countdownElement.innerHTML = "RMN Fall Off: NOW";
                ytEmbedContainer.classList.remove('hidden');
            }
        }
    });
});
