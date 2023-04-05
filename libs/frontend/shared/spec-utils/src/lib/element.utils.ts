import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export function getTestIdSelector(testId: string): string {
  return `[data-cy="${testId}"]`;
}

export function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement)
    throw new Error(`queryByCss: Element with ${selector} was not found.`);
  return debugElement;
}

export function findEl<T>(
  fixture: ComponentFixture<T>,
  testId: string
): DebugElement {
  return queryByCss<T>(fixture, getTestIdSelector(testId));
}

export function setFieldElementValue(
  element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  value: string
): void {
  element.value = value;
  const isSelect = element instanceof HTMLSelectElement;
  element.dispatchEvent(new Event(isSelect ? 'change' : 'input'));
}

export function setFileFieldElementValue<T>(
  element: HTMLInputElement,
  file: File[]
): void {
  allowToOverrideFilesProperty.call(this);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  element.files = file;
  element.dispatchEvent(new Event('change'));
}

function allowToOverrideFilesProperty() {
  const fileCache = new WeakMap();
  Object.defineProperty(HTMLInputElement.prototype, 'files', {
    set(fileList) {
      fileCache.set(this, fileList);
      Object.defineProperty(this, 'files', {
        get() {
          return fileCache.get(this);
        },
        set(value) {
          fileCache.set(this, value);
        },
      });
    },
  });
}

export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  value: string
): void {
  setFieldElementValue(findEl(fixture, testId).nativeElement, value);
}

export function setFileFieldValue<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  file: File[]
) {
  setFileFieldElementValue(findEl(fixture, testId).nativeElement, file);
}

export function markFieldAsBlurred<T>(
  fixture: ComponentFixture<T>,
  testId: string
): void {
  findEl(fixture, testId).nativeElement.dispatchEvent(new Event('blur'));
}

export function expectContent<T>(
  fixture: ComponentFixture<T>,
  text: string
): void {
  expect(fixture.nativeElement.textContent).toBe(text);
}
