# Module 10: Taylor and Maclaurin Series Expansions

# Module 10: Taylor and Maclaurin Series
## Calculus 1 - Final Examination Preparation

### 1. Definitions
- **Taylor Series** of $f(x)$ centered at $x = a$:
$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x - a)^n = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots$$
- **Maclaurin Series**: Taylor series centered at $a = 0$:
$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n$$

### 2. Essential Maclaurin Series to Memorize
| Function | Maclaurin Series $\sum$ | Expanded Terms | IOC |
|---|---|---|---|
| $\frac{1}{1-x}$ | $\sum_{n=0}^\infty x^n$ | $1 + x + x^2 + x^3 + \cdots$ | $(-1, 1)$ |
| $e^x$ | $\sum_{n=0}^\infty \frac{x^n}{n!}$ | $1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$ | $(-\infty, \infty)$ |
| $\sin(x)$ | $\sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!}$ | $x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$ | $(-\infty, \infty)$ |
| $\cos(x)$ | $\sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{(2n)!}$ | $1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$ | $(-\infty, \infty)$ |
| $\ln(1+x)$ | $\sum_{n=1}^\infty (-1)^{n-1} \frac{x^n}{n}$ | $x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$ | $(-1, 1]$ |
| $\arctan(x)$ | $\sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{2n+1}$ | $x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots$ | $[-1, 1]$ |

### 3. Applications
- Evaluating non-elementary integrals: e.g., $\int e^{-x^2} \, dx$, $\int \frac{\sin x}{x} \, dx$.
- Evaluating indeterminate limits without l'Hôpital's Rule.
