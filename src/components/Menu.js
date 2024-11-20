

const Menu = ({ onClick }) => (
  <>
  <div className="Menu">
   
<body class="bg-gray-900 text-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-gray-800 rounded-lg shadow-lg p-6 w-full min-w-[200%] max-w-lg min-h-[2rem]">
 
    <button class="w-full bg-gray-400 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-md text-lg mb-6" onClick={onClick}>
      New game
    </button>


    <div class="space-y-6">
    
      <div>
        <label for="initial-level" class="block text-left text-sm font-medium mb-1">Initial level</label>
        <div class="flex items-center justify-between">
          <input type="range" id="initial-level" min="1" max="10" value="3" class="w-3/4 accent-yellow-400"/>
          <span class="ml-4 text-yellow-400 font-semibold">1</span>
        </div>
      </div>

      <div>
        <label for="initial-rows" class="block text-left text-sm font-medium mb-1">Expert Level</label>
        <div class="flex items-center justify-between">
          <input type="range" id="initial-rows" min="1" max="10" value="5" class="w-3/4 accent-yellow-400"/>
          <span class="ml-4 text-yellow-400 font-semibold">5</span>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="text-sm">Your score</p>
      <p class="text-4xl text-yellow-400 font-bold mt-2">0000</p>
    </div>

  </div>
</body>
  </div>

 </>
);

export default Menu;
