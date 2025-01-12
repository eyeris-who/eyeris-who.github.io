document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const navbar = document.querySelector('.topnav');
        const floatBox = document.querySelector('.float-box');
        
        const scrollTrigger = 20; 
        
        if (scrollPosition > scrollTrigger) {
            navbar.classList.add('scrolled');
            floatBox.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            floatBox.classList.remove('scrolled');
        }
    });
});

let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')
const pfpImage = document.getElementById('pfp')
const audioElement = document.querySelector('audio')
const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
    pfpImage.src = "images/longlegs.jpeg"
    audioElement.src = "images/honey.mp3"
}
const disableDarkmode=() => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
    pfpImage.src = "images/snow.jpeg"
    audioElement.src = "images/September-Instrumental.mp3"
}
if(darkmode === "active") {
    enableDarkmode()
}
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    if (darkmode !=="active") {
        enableDarkmode()
    }
    else {
        disableDarkmode();
    }
})

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('move');
        }
        else {
            entry.target.classList.remove('move');
        }
    });
});

const fullElements = document.querySelectorAll('.full');
fullElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', function(event) {
    const elements = document.getElementsByClassName('typewriter');
    
    Array.from(elements).forEach(element => {
        const dataText = JSON.parse(element.getAttribute('dataText') || '[]');
        const restart = element.getAttribute('restart') || 'yes';
        let currentIndex = 0;
        let blinkInterval;
        
        function typeWriter(text, i, fnCallback) {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i+1) + '<span aria-hidden="true" class="blink"></span>';
                setTimeout(function() {
                    typeWriter(text, i + 1, fnCallback)
                }, 100);
            } else if (typeof fnCallback == 'function') {
                setTimeout(fnCallback, 700);
            }
        }
        
        function deleteWriter(text, i, fnCallback) {
            if (i >= 0) {
                element.innerHTML = text.substring(0, i) + '<span aria-hidden="true" class="blink"></span>';
                setTimeout(function() {
                    deleteWriter(text, i - 1, fnCallback)
                }, 100);
            } else if (typeof fnCallback == 'function') {
                setTimeout(fnCallback, 700);
            }
        }

        function blinkCaret() {
            const currentText = element.innerHTML;
            const textWithoutCaret = currentText.replace('<span aria-hidden="true" class="blink"></span>', '');
            element.innerHTML = textWithoutCaret + '<span aria-hidden="true" class="blink"></span>';
        }
        
        function startAnimation() {
            typeWriter(dataText[currentIndex], 0, function() {
                if (restart.toLowerCase() === 'yes') {
                    // For restart=yes, always delete and move to next text
                    setTimeout(function() {
                        deleteWriter(dataText[currentIndex], dataText[currentIndex].length, function() {
                            currentIndex = (currentIndex + 1) % dataText.length; // Loop back to start when reaching the end
                            startAnimation();
                        });
                    }, 1000);
                } else {
                    // For restart=no, only delete if not the last text
                    if (currentIndex < dataText.length - 1) {
                        setTimeout(function() {
                            deleteWriter(dataText[currentIndex], dataText[currentIndex].length, function() {
                                currentIndex++;
                                startAnimation();
                            });
                        }, 1000);
                    }
                }
            });
        }
        
        if (dataText.length > 0) {
            if (restart.toLowerCase() === 'yes') {
                element.innerHTML = '<span aria-hidden="true" class="blink"></span>';
                setTimeout(startAnimation, 10000);
            } else if (restart.toLowerCase() === 'no'){
                typeWriter(dataText[currentIndex], 0, function() {
                    if (currentIndex < dataText.length - 1) {
                        setTimeout(function() {
                            deleteWriter(dataText[currentIndex], dataText[currentIndex].length, function() {
                                currentIndex++;
                                startAnimation();
                            });
                        }, 1000);
                    }
                });
            }
        }
    });
});
