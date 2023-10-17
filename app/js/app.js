// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {


    const swiper = new Swiper('.swiper', {
        // Optional parameters
        slidesPerView: 1,
        direction: 'horizontal',
        loop: 'true',


        // If we need pagination
        pagination: {
            el: '.swiper-dots',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-btn-nxt',
            prevEl: '.swiper-btn-prev',
        },


    });


    const slide = document.getElementById('slide-template').content
    const slideContainer = document.querySelector('.table-content')


    const renderSlides = (array) => {
        array.forEach(item => {
            const cloneSlide = document.importNode(slide, true);
            const tableTitle = cloneSlide.querySelector('.table_title');
            const statsList = cloneSlide.querySelector('.table-ct');
            tableTitle.textContent = item.mount;


            item.table.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item[0];
                const listSpan = document.createElement('span')
                const value = item[1]
                // value.indexOf('-')
                if (value > 0) {
                    listSpan.textContent = '+' + item[1] + '%'
                } else {
                    listSpan.textContent = item[1] + '%'
                }
                listItem.appendChild(listSpan)
                statsList.appendChild(listItem)
            });

            const dropDownArrow = cloneSlide.querySelector('.dropdown-table');
            const animateList = cloneSlide.querySelector('.animate-list');
            dropDownArrow.addEventListener('click', () => {
                const currentState = dropDownArrow.getAttribute('data-open');
                const toggle = currentState === 'false' ? 'true' : 'false';
                animateList.setAttribute('data-open', toggle);
                dropDownArrow.setAttribute('data-open', toggle);
            });

            slideContainer.append(cloneSlide);
        });
    }


    const pnl = document.querySelector('.PNL')
    const deals = document.querySelector('.DEALS')

    const updateStats = () => {
        fetch('https://radanstats.writingeraser.ru/api/stats/total')
            .then(x => x.json())
            .then(x => {
                if (x.pnl) {
                    pnl.textContent = '+' + x.pnl + '%'
                }
                if (x.deals) {
                    deals.textContent = x.deals
                }
            })

    }

    updateStats()
    fetch('https://radanstats.writingeraser.ru/api/stats/months')
        .then(x => x.json())
        .then(x => {
            renderSlides(x)
        })

    const faqSlide = document.querySelectorAll('.table-slide_dark')

    faqSlide.forEach(slide=>{
        const animateList = slide.querySelector('.animate-list');
        const dropDownArrow = slide.querySelector('.dropdown-table');
        dropDownArrow.addEventListener('click', () => {
            const currentState = dropDownArrow.getAttribute('data-open');
            const toggle = currentState === 'false' ? 'true' : 'false';
            animateList.setAttribute('data-open', toggle);
            dropDownArrow.setAttribute('data-open', toggle);
        });
    })





})
