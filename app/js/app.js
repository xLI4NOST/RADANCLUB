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

    const nextSlidesButton = document.querySelector('.mt-link')
    const renderSlides = (array , index) => {
        let initialElems = array.slice(0, index)
        initialElems.forEach(item => {
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

    function renderNextElements(array) {
        fetch('https://radanstats.writingeraser.ru/api/stats/months')
            .then(x => x.json())
            .then(x => {
                slideContainer.innerHTML = ''
                renderSlides(x, 6)
            })

    }

    nextSlidesButton.addEventListener('click', renderNextElements)


    const pnl = document.querySelectorAll('.PNL')
    const deals = document.querySelectorAll('.DEALS')

    const updateStats = () => {
        fetch('https://radanstats.writingeraser.ru/api/stats/total')
            .then(x => x.json())
            .then(x => {
                if (x.pnl) {
                    pnl.forEach(item => {
                        item.textContent = '+' + x.pnl + '%'
                    })

                }
                if (x.deals) {
                    deals.forEach(item => {
                        item.textContent = x.deals
                    })

                }
            })

    }

    updateStats()
    fetch('https://radanstats.writingeraser.ru/api/stats/months')
        .then(x => x.json())
        .then(x => {
            renderSlides(x, 3)

        })

    const faqSlide = document.querySelectorAll('.table-slide_dark')

    faqSlide.forEach(slide => {
        const animateList = slide.querySelector('.animate-list');
        const dropDownArrow = slide.querySelector('.dropdown-table');
        dropDownArrow.addEventListener('click', () => {
            const currentState = dropDownArrow.getAttribute('data-open');
            const toggle = currentState === 'false' ? 'true' : 'false';
            animateList.setAttribute('data-open', toggle);
            dropDownArrow.setAttribute('data-open', toggle);
        });
    })

    const headerLink = document.querySelector('.header_link')
    const residentButton = document.querySelector('.resident-button')


    function scrollToCenterClub() {
        const clubWrapper = document.querySelector('.club-wrapper')
        if (clubWrapper) {
            const yOffset = clubWrapper.getBoundingClientRect().top - window.innerHeight / 2 + clubWrapper.clientHeight / 2;
            window.scrollTo({
                top: yOffset,
                behavior: 'smooth'
            });
        }
    }
    headerLink.addEventListener('click', scrollToCenterClub)


    function scrollToQuestionare() {
        const questionare = document.querySelector('.questionnaire-wrapper');
        if (questionare) {
            questionare.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function scrollToVideo (){
        console.log('sdsdsdds')
        const videoBlock = document.querySelector('.video_block')
        if(videoBlock){
            videoBlock.scrollIntoView({behavior:'smooth', block:'end'})
        }
    }

    residentButton.addEventListener('click', scrollToQuestionare);
    const watchButton = document.querySelector('.watch')
    watchButton.addEventListener('click', scrollToVideo)



    const closeIcon = document.querySelector('.close-icon')
    const popup = document.querySelector('.form_to')
    const questionary = document.querySelector('.questionary')
    const openPopup =()=>{
        popup.classList.add('form_active')
    }
    const closePopup =()=>{
        popup.classList.remove('form_active')
    }
    questionary.addEventListener('click', openPopup)
    closeIcon.addEventListener('click', closePopup)
})
