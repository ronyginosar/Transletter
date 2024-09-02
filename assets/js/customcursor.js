document.body.onmousemove = function(e) {
    document.documentElement.style.setProperty (
      '--x', (
        e.clientX+window.scrollX
      )
      + 'px'
    );
    document.documentElement.style.setProperty (
      '--y', (
        e.clientY+window.scrollY
      ) 
      + 'px'
    );
  };


// let mouseCursor = document.querySelector(".cursor");
// let Links = document.querySelectorAll("a");
let iframes = document.querySelectorAll("iframe");
// let logo = document.querySelector(".logo-error");

// window.addEventListener('mousemove', cursor);

// function cursor(e){
// 	// mouseCursor.style.top = "calc(" +e.pageY + "px - 1rem)";
//   	// mouseCursor.style.left = "calc(" +e.pageX + "px - 1rem)";
//       mouseCursor.style.setProperty (
//       '--x', (
//         e.clientX+window.scrollX
//       )
//       + 'px'
//     );
//     mouseCursor.style.setProperty (
//       '--y', (
//         e.clientY+window.scrollY
//       ) 
//       + 'px'
//     );
//   };


// Links.forEach(link =>{

//     if ( link !== logo ){

//         link.addEventListener("mouseleave", () => {

//             mouseCursor.classList.remove("link-grow");
//         });

//         link.addEventListener("mouseover", () => {

//             mouseCursor.classList.add("link-grow");
//         });
//     }  

// });

iframes.forEach(frame =>{
  
    let mouseCursor = document.querySelector(".cursor");

		frame.addEventListener("mouseleave", () => {
    
    		mouseCursor.classList.remove("hide");
    	});
  
  		frame.addEventListener("mouseover", () => {
    
    		mouseCursor.classList.add("hide");
    	});
  	
});