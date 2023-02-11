
const drawTokenomicsChart = async () => {

    if (!document.getElementById('tokenomicsChart')) {
        return;
    }

    const image = new Image();
    image.src = 'assets/images/tokenomics/logo_white_192.png';

    const backgroundimage = {
        id: 'custom_canvas_background_image',
        beforeDraw: (chart) => {
            if (image.complete) {
                const ctx = chart.ctx;
                const { top, left, width, height } = chart.chartArea;
                const x = left + width / 2 - image.width / 2;
                const y = top + height / 2 - image.height / 2;
                ctx.drawImage(image, x, y);
            } else {
                image.onload = () => chart.draw();
            }
        }
    };

    const labels = [
        'Team & Development',
        'Airdrops & Presale',
        'Consulting & Advisors',
        'Marketing & Promotion',
        'Incentives & Rewards'
    ];


    const data = {
        labels: labels,
        datasets: [{
            label: 'Tokenomics of the Radiator Coin',
            data: [18, 26, 8, 8, 40],
            hoverBorderColor: '#458bff',
            backgroundColor: [
                '#311155',
                '#211C7C',
                '#4581AF',
                '#60A6BD',
                '#98D7CF',
                '#D2EFE0'
            ],
            color: '#FFFFFF',
            hoverOffset: 25
        }]
    };


    const config = {
        type: 'doughnut',
        data: data,
        plugins: [backgroundimage],
        options: {
            layout: {
                autopadding: true,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    align: 'center',
                    fullSize: false,
                    labels: {
                        color: '#FFFFFF',
                        boxWidth: 60,
                        boxHeight: 20,
                        padding: 20,
                    },
                    title: {
                        display: false,
                        text: '100.000.000$ RADIATOR',
                    },
                }
            }
        }
    };

    const tokenomicsChart = new Chart(
        document.getElementById('tokenomicsChart'),
        config
    );
}