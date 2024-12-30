document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const navbar = document.querySelector('.topnav');
        const floatBox = document.querySelector('.float-box');
        
        // Change this value to adjust when the transition happens
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

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', function(event) {
    const elements = document.getElementsByClassName('typewriter');
    
    Array.from(elements).forEach(element => {
        const dataText = JSON.parse(element.getAttribute('dataText') || '[]');
        const restart = element.getAttribute('restart') || 'yes';
        let currentIndex = 0;
        
        function typeWriter(text, i, fnCallback) {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
                setTimeout(function() {
                    typeWriter(text, i + 1, fnCallback)
                }, 100);
            } else if (typeof fnCallback == 'function') {
                setTimeout(fnCallback, 700);
            }
        }
        
        function deleteWriter(text, i, fnCallback) {
            if (i >= 0) {
                element.innerHTML = text.substring(0, i) + '<span aria-hidden="true"></span>';
                setTimeout(function() {
                    deleteWriter(text, i - 1, fnCallback)
                }, 100);
            } else if (typeof fnCallback == 'function') {
                setTimeout(fnCallback, 700);
            }
        }

        function blinkCaret() {
            const currentText = dataText[dataText.length - 1];
            element.innerHTML = currentText + '<span aria-hidden="true" class="blink"></span>';
            setTimeout(blinkCaret, 700);
        }
        
        function startAnimation() {
            typeWriter(dataText[currentIndex], 0, function() {
                setTimeout(function() {
                    deleteWriter(dataText[currentIndex], dataText[currentIndex].length, function() {
                        currentIndex = (currentIndex + 1) % dataText.length;
                        startAnimation();
                    });
                }, 1000);
            });
        }
        
        if (dataText.length > 0) {
            if (restart.toLowerCase() === 'yes') {
                // Initial blink for 1000ms before starting animation
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
                    } else {
                        blinkCaret();
                    }
                });
            }
        }
    });
});