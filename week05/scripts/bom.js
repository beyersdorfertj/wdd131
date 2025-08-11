const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

const setChapterList = () => {
  localStorage.setItem("bom-chapters", JSON.stringify(chaptersArray));
}

const getChapterList = () => {
  const chapters = localStorage.getItem("bom-chapters");
  return chapters ? JSON.parse(chapters) : [];
}

const deleteChapter = (chapter) => {
  console.log("deleteChapter called with:", chapter);
  chapter = chapter.slice(0, chapter.length - 1);
  console.log("deleteChapter called with2:", chapter);
  chaptersArray = chaptersArray.filter(item => item !== chapter);
  setChapterList();
}

const displayList = (chapter) => {
  const li = document.createElement("li");
  li.textContent = chapter;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.addEventListener("click", function() {
    list.removeChild(li);
    deleteChapter(li.textContent);
    input.focus();
  });
  li.append(deleteButton);
  list.append(li);
}

let chaptersArray = getChapterList() || [];
chaptersArray.forEach(chapter => {
  displayList(chapter);
});

button.addEventListener("click", function() {
  if (input.value.trim() !== "") {
    displayList(input.value);
    chaptersArray.push(input.value.trim());
    setChapterList();
    input.value = "";
  }
  input.focus();
});

