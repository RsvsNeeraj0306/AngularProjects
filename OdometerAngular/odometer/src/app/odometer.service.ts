import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OdometerService {
  private ans = 0;

  constructor() {}

  initializeOdometer(n: number) {
    this.ans = 0; 
    for (let i = 1; i <= n; i++) {
      this.ans = this.ans * 10 + i;
    }
  }

  getReading(): number {
    return this.ans;
  }

  
  nextReading(n: number): number {
    const large = this.largestNumber(n);
    const small = this.smallestNumber(n);
    while (n <=large) {
      if (n === large) {
        return small;
      }
      n = n + 1;
      if (this.isAscending(n)) {
        break;
      }
    }
    return n;
  }

  previousOdometer(n: number): number {
    const small = this.smallestNumber(n);
    const large = this.largestNumber(n);
    while (n >= small) {
      if (n === small) {
        return large;
      }
      n = n - 1;
      if (this.isAscending(n)) {
        break;
      }
    }
    return n;
  }

  private largestNumber(n: number): number {
    let count = 0;
    let ans = 0;
    count = this.countOfDigit(n);
      for (let i = count; i > 0; i--) {
        ans = ans * 10 + (10 - i);
      }
    
    return ans;
  }

  private smallestNumber(n: number): number {
    let ans = 0;
    let count = 0;
    count = this.countOfDigit(n);
      for (let i = 1; i <= count; i++) {
        ans = ans * 10 + i;
      }

    
    return ans;
  }

  private countOfDigit(n: number): number {
    let count = 0;
    while (n !== 0) {
      n = Math.floor(n / 10);
      count++;
    }
    return count;
  }

  private isAscending(n: number): boolean {
    const numStr = n.toString();
    for (let i = 1; i < numStr.length; i++) {
      if (numStr[i - 1] >= numStr[i]) {
        return false;
      }
    }
    return true;
  }
  
}
