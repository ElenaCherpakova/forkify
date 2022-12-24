import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // closest method searches for the closest parent element that matches the selector
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(1);
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(-1);
    }

    //Other page
    if (curPage < numPages) {
      return this._generateMarkupButton(1) + this._generateMarkupButton(-1);
    }
    //Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(numPage) {
    const currentPage = this._data.page;
    return `
    <button data-goto="${numPage > 0 ? currentPage + 1 : currentPage - 1}"
    class="btn--inline pagination__btn--${numPage > 0 ? 'next' : 'prev'}">
      <span>Page ${numPage + currentPage}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${numPage > 0 ? 'right' : 'left'}"></use>
      </svg>
    </button>
    `;
  }
}

export default new PaginationView();
