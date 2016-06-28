import {
  INDEX_PAGE_INCREMENT,
  INDEX_PAGE_DECREMENT
} from "../constants";


export function increment() {
  return { type: INDEX_PAGE_INCREMENT };
}

export function decrement() {
  return { type: INDEX_PAGE_DECREMENT };
}
