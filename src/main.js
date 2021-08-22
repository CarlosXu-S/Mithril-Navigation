const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const site = localStorage.getItem('site')
const siteObject = JSON.parse(site)
const hashMap = siteObject || [
    { logo: 'G', url: 'https://github.com/'},
    { logo: 'J', url: 'https://juejin.cn/'},
]

const  simplifyUrl= (url)=>{
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') //删除 / 开头的内容
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)=>{
    const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
                        
            </div>
        </li>
    `).insertBefore($lastLi)
    $li.on('click', ()=>{
        window.open(node.url)
    })
    $li.on('click', '.close',(e)=>{
        console.log('这里')
        e.stopPropagation() //阻止冒泡
        hashMap.splice(index, 1)
        render()
    })
});
}
render();

$('.addButton')
    .on('click', ()=>{
        let url=window.prompt('请问你要添加的网址是：')
        if(url.indexOf('http')!==0){
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo:simplifyUrl(url)[0],
            url: url
        });
        render();
    });
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('site',string)
}
$(document).on('keypress', (e)=>{
    const {key} = e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})